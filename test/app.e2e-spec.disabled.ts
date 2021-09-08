import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture
      .createNestApplication()
      .useGlobalPipes(new ValidationPipe())
      .init();
  });

  afterAll((done) => {
    void app.close()
      .then(() => done());
  });

  test('GET /', async () =>
    request(app.getHttpServer())
      .get('/')
      .expect(404));
});
