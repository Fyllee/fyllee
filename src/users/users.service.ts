import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type { AuthRegisterDto } from '../auth/dto/auth-register.dto';
import type { UsernameEmail } from '../global/types/username-email.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>,
  ) {}

  public async exists(dto: UsernameEmail): Promise<boolean> {
    const user = await this.userRepository.findOne({ $or: [{ username: dto.username }, { email: dto.email }] });
    return Boolean(user);
  }

  public async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ username });
  }

  public async findOneByToken(token: string): Promise<User | null> {
    return await this.userRepository.findOne({ token });
  }

  public async create(dto: AuthRegisterDto): Promise<User> {
    const user = new User(dto.username, dto.email, dto.password);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  public async removeOne(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ userId });
    if (user)
      await this.userRepository.removeAndFlush(user);
  }
}
