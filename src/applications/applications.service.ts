import { promises as fs } from 'fs';
import { EntityRepository, UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
 BadRequestException,
 Injectable,
 NotFoundException,
 UnauthorizedException,
} from '@nestjs/common';
import { Content } from '../contents/content.entity';
import { User } from '../users/user.entity';
import { Application } from './application.entity';
import type { CreateApplicationDto } from './dto/create-application.dto';
import type { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Application) private readonly applicationRepository: EntityRepository<Application>,
    @InjectRepository(Content) private readonly contentRepository: EntityRepository<Content>,
  ) {}

  public async create(userId: string, dto: CreateApplicationDto): Promise<Application> {
    const user = await this.userRepository.findOne({ userId });
    if (!user)
      throw new UnauthorizedException('Invalid token');

    try {
      const app = new Application(user, dto.name, dto.website, dto.description);
      await fs.mkdir(app.getUploadPath());
      await this.applicationRepository.persistAndFlush(app);
      return app;
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Name is already taken');
      throw error;
    }
  }

  public async findAll(userId: string): Promise<Application[]> {
    return await this.applicationRepository.find({ owner: { userId } });
  }

  public async findOne(applicationId: string): Promise<Application | null> {
    const app = await this.applicationRepository.findOne({ applicationId });
    if (!app)
      throw new NotFoundException('Application not found');
    return app;
  }

  public async findOneByToken(token: string): Promise<Application | null> {
    return await this.applicationRepository.findOne({ token });
  }

  public async update(applicationId: string, dto: UpdateApplicationDto): Promise<Application> {
    const app = await this.applicationRepository.findOne({ applicationId });
    if (!app)
      throw new NotFoundException('Application not found');

    wrap(app).assign({ displayName: dto.displayName ?? '', description: dto.description ?? '', website: dto.website ?? '' });
    await this.applicationRepository.flush();

    return app;
  }

  public async removeOne(applicationId: string): Promise<void> {
    const application = await this.applicationRepository.findOne({ applicationId });
    if (!application)
      throw new NotFoundException('Application not found');

    await fs.rm(application.getUploadPath(), { recursive: true });

    await this.contentRepository.nativeDelete({ application: { applicationId } });
    await this.applicationRepository.removeAndFlush(application);
  }
}
