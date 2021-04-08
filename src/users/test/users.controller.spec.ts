import { getRepositoryToken } from '@mikro-orm/nestjs';
import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AuthService } from '../../auth/auth.service';
import { UserTokenStrategy } from '../../auth/user-token.strategy';
import { User } from '../user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

const mockedUser: User = {
  userId: 'abcdefg',
  token: 'a_very_very_very_long_and_secure_token.abcdefg',
  email: 'user@email.com',
  username: 'john',
  displayName: 'john',
  password: '$2y$10$/LH.0gTnnQVf0tZwcC4.5untTvIC3aJeNzGZYIWKx6MqqWGhorUZO ',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UsersController: Login', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        AuthService,
        UserTokenStrategy,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: (param: Partial<User>): User | null =>
              (param.token === mockedUser.token ? mockedUser : null),
          },
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  test('GIVEN valid token THEN it responds with correct body and statusCode', async () =>
    request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${mockedUser.token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          status: 'OK',
          message: 'Data has been retrieved.',
          user: {
            displayName: mockedUser.displayName,
            username: mockedUser.username,
            userId: mockedUser.userId,
            email: mockedUser.email,
          },
        });
    }));

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
