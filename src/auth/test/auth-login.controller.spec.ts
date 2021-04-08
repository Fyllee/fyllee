import { getRepositoryToken } from '@mikro-orm/nestjs';
import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../local.strategy';
import { mockedUser } from './__mocks__/user.mock';

jest.mock('bcrypt');

describe('AuthController: Login', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.spyOn(bcrypt, 'compare').mockReturnValue(Promise.resolve(true));

    const moduleFixture = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        AuthService,
        LocalStrategy,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: (param: Partial<User>): User | null =>
              (param.username === mockedUser.username ? mockedUser : null),
            persistAndFlush: jest.fn(),
          },
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  test('GIVEN valid data THEN it responds with correct body and statusCode', async () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: mockedUser.username,
        password: 'strongPassword',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          status: 'OK',
          message: 'You have been logged in.',
          user: {
            displayName: mockedUser.displayName,
            username: mockedUser.username,
            userId: mockedUser.userId,
            email: mockedUser.email,
          },
        });
    }));

  test('GIVEN only username THEN it responds with 401', async () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: mockedUser.username })
      .expect(401));

  test('GIVEN only email THEN it responds with 401', async () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockedUser.email })
      .expect(401));

  test('GIVEN only password THEN it responds with 400', async () =>
    request(app.getHttpServer())
      .post('/auth/register')
      .send({ password: mockedUser.password })
      .expect(400));
});
