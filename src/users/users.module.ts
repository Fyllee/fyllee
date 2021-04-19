import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Application } from '../applications/application.entity';
import { ApplicationsService } from '../applications/applications.service';
import { AuthService } from '../auth/auth.service';
import { UserTokenStrategy } from '../auth/user-token.strategy';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature([Application, User])],
  providers: [
    ApplicationsService,
    AuthService,
    UsersService,
    UserTokenStrategy,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
