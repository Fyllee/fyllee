import { getRepositoryToken } from '@mikro-orm/nestjs';
import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

const mockedUser: User = {
  userId: 'abcdefg',
  token: 'a_very_very_very_long_and_secure_token.abcdefg',
  email: 'user@email.com',
  username: 'john',
  displayName: 'john',
  password: 'hash12345',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AuthController', () => {
  let app: INestApplication;
  let userData: User;

  beforeEach(async () => {
    userData = { ...mockedUser };

    const moduleFixture = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(userData),
            findOne: jest.fn(),
            persistAndFlush: jest.fn(),
          },
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Registration', () => {
    test('GIVEN valid data THEN responds with correct body and statusCode', async () => {
      const expectedData = {
        status: 'OK',
        message: 'Account has been created.',
        user: {
          username: userData.username,
          email: userData.email,
        },
      };

      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: mockedUser.email,
          username: mockedUser.username,
          password: 'strongPassword',
        })
        .expect(201)
        .expect(({ body: response }) => {
          const receivedData = {
            status: response.status,
            message: response.message,
            user: { username: response.user.username, email: response.user.email },
          };
          expect(receivedData).toStrictEqual(expectedData);
        });
    });

    test('GIVEN invalid data THEN response with correct statusCode', async () =>
      request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: mockedUser.username })
        .expect(400));
  });
});
