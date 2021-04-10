import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Application } from '../applications/application.entity';
import { ApplicationsService } from '../applications/applications.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserTokenStrategy } from './user-token.strategy';

@Module({
  imports: [PassportModule, MikroOrmModule.forFeature([Application, User])],
  providers: [
    ApplicationsService,
    AuthService,
    LocalStrategy,
    UsersService,
    UserTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
