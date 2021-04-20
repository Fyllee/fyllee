import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserTokenStrategy } from '../auth/user-token.strategy';
import { Content } from '../contents/content.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Application } from './application.entity';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [MikroOrmModule.forFeature([Application, Content, User])],
  providers: [
    ApplicationsService,
    AuthService,
    UsersService,
    UserTokenStrategy,
  ],
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
