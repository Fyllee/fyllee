import { MikroORM } from '@mikro-orm/core';
import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import config from '../src/mikro-orm.config';
import { User } from '../src/users/user.entity';

interface UserResponse {
  body: User;
}

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: MikroORM;
  const userIds: string[] = [];

  beforeAll(async () => {
    dbConnection = await MikroORM.init(config);
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
      .then(async () => dbConnection.em.getRepository(User).nativeDelete({ userId: { $in: userIds } }))
      .then(async () => dbConnection.close())
      .then(() => done());
  });

  test('GIVEN valid user & token THEN it creates user and finds it by bearer', async () => {
    const user = {
      username: 'john_smith',
      email: 'john.smith@gmail.com',
      password: 'J0hnS1mth_1234',
    };

    const { body: data }: UserResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send(user);

    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${data.token}`)
      .expect(200)
      .expect(({ body }: UserResponse) => {
        userIds.push(body.userId);
        expect(body.email).toBe(user.email);
        expect(body.displayName).toBe(user.username);
        expect(body.username).toBe(user.username);
      });
  });

  test('GIVEN invalid token THEN it responds with 401', async () =>
    request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'bearer invalid-token')
      .expect(400)
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          error: 'Bad Request',
          message: 'Unknown user',
          statusCode: 400,
        });
      }));

  test('GIVEN no header THEN it responds with 400', async () =>
    request(app.getHttpServer())
      .get('/users')
      .expect(400)
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          error: 'Bad Request',
          message: 'No Authorization header',
          statusCode: 400,
        });
      }));
});
