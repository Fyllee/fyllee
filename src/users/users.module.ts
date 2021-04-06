import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserTokenStrategy } from '../auth/user-token.strategy';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, UserTokenStrategy],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
