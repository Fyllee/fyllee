import { promises as fs } from 'fs';
import path from 'path';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Injectable,
  NotFoundException,
  PayloadTooLargeException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Express } from 'express';
import { Application } from '../applications/application.entity';
import type { ContentInformation } from '../global/types/content-information.interface';
import { Content } from './content.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Application) private readonly applicationRepository: EntityRepository<Application>,
    @InjectRepository(Content) private readonly contentRepository: EntityRepository<Content>,
    private readonly configService: ConfigService,
  ) {}

  public async create(applicationId: string, file: Express.Multer.File): Promise<Content> {
    if (file.size > this.configService.get<number>('maxUploadSizePerFile')!)
      throw new PayloadTooLargeException(`File too large, max ${this.configService.get<number>('maxUploadSizePerFile')} bytes.`);

    const application = await this.applicationRepository.findOne({ applicationId });
    if (!application)
      throw new UnauthorizedException('Invalid token');

    const content = new Content(application, file.originalname, file.size);
    await fs.writeFile(
      path.join(path.resolve('./'), 'uploads', application.applicationId, content.savedName),
      file.buffer,
    );

    await this.contentRepository.persistAndFlush(content);
    return content;
  }

  public async findAll(applicationId: string): Promise<Content[]> {
    return await this.contentRepository.find({ application: { applicationId } });
  }

  public async findOne(contentId: string): Promise<Content> {
    const content = await this.contentRepository.findOne({ contentId });
    if (!content)
      throw new NotFoundException('Content not found');
    return content;
  }

  public async findInformation(contentId: string): Promise<ContentInformation> {
    const content = await this.contentRepository.findOne({ contentId });
    if (!content)
      throw new NotFoundException('Content not found');
    return content.toJSON();
  }

  public async removeOne(contentId: string): Promise<void> {
    const content = await this.contentRepository.findOne({ contentId });
    if (!content)
      throw new NotFoundException('Content not found');

    this.contentRepository.remove(content);
    await this.contentRepository.flush();

    await fs.rm(path.join(path.resolve('./'), 'uploads', content.application.applicationId, content.savedName));
  }
}
