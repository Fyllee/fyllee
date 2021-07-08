import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { logger } from './global/middlewares/logger.middleware';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.use(logger);
  app.use(helmet());

  const configService = app.get(ConfigService);

  if (configService.get('NODE_ENV') === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Fyllee')
      .setDescription('The Fyllee API description')
      .setVersion('1.0')
      .addBasicAuth()
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    Logger.log('Documentation mounted on /docs/', 'Bootstrap');
  }

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT ?? 5000);

  Logger.log(`API running on: ${(await app.getUrl()).replace('[::1]', 'localhost')}`, 'Bootstrap');
}

void bootstrap();
