import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Application } from '../applications/application.entity';
import { ApplicationsService } from '../applications/applications.service';
import { ApplicationTokenStrategy } from '../auth/application-token.strategy';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Content } from './content.entity';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';

@Module({
  imports: [MikroOrmModule.forFeature([Content, Application, User])],
  providers: [
    ApplicationsService,
    ApplicationTokenStrategy,
    AuthService,
    ConfigService,
    ContentsService,
    UsersService,
  ],
  controllers: [ContentsController],
  exports: [ContentsService],
})
export class ContentsModule {}
