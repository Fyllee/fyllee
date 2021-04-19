import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
        PORT: Joi.number().default(5000),
      }),
    }),
    MikroOrmModule.forRoot(),
    ApplicationsModule,
    AuthModule,
    ContentsModule,
    UsersModule,
  ],
})
export class AppModule {}
