import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { Application } from '../../applications/application.entity';
import { ApplicationsService } from '../../applications/applications.service';
import { mockedApplication } from '../../applications/test/__mocks__/application.mock';
import { Content } from '../../contents/content.entity';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../local.strategy';
import { UserTokenStrategy } from '../user-token.strategy';
import { expectedUser, mockedUser, password } from './__mocks__/user.mock';

jest.mock('bcrypt');

describe('AuthController: Login', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // @ts-expect-error ts(2345): Argument of type 'boolean' is not assignable to parameter of type 'never'
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const moduleFixture = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        ApplicationsService,
        AuthService,
        LocalStrategy,
        UsersService,
        UserTokenStrategy,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: (param: Partial<User>): User | null =>
              (param.username === mockedUser.username ? { ...mockedUser, password } : null),
            persistAndFlush: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Application),
          useValue: {
            findOne: (param: Partial<Application>): Application | null =>
              (param.name === mockedApplication.name ? mockedApplication : null),
            persistAndFlush: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Content),
          useValue: {},
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
        password: mockedUser.password,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject(expectedUser);
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
