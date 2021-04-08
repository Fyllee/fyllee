import type { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';
import { User } from './users/user.entity';

const logger = new Logger('MikroORM');

export default {
  migrations: {
    path: './src/migrations',
  },
  type: 'postgresql',
  username: 'bild-admin',
  entities: [User],
  debug: true,
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
} as Options;