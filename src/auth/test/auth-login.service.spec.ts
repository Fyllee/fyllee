import { getRepositoryToken } from '@mikro-orm/nestjs';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { Application } from '../../applications/application.entity';
import { ApplicationsService } from '../../applications/applications.service';
import { mockedApplication } from '../../applications/test/__mocks__/application.mock';
import { Content } from '../../contents/content.entity';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../local.strategy';
import { UserTokenStrategy } from '../user-token.strategy';
import { mockedUser } from './__mocks__/user.mock';

jest.mock('bcrypt');

describe('AuthService: Login (local)', () => {
  let authService: AuthService;
  let bcryptCompare: jest.SpyInstance<Promise<boolean>>;
  beforeEach(async () => {
    // @ts-expect-error ts(2345): Argument of type 'boolean' is not assignable to parameter of type 'never'
    bcryptCompare = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const moduleFixture = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        AuthService,
        LocalStrategy,
        UsersService,
        UserTokenStrategy,
        {
          provide: UsersService,
          useValue: {
            findOne: (username: string): User | null => (username === mockedUser.username ? mockedUser : null),
            findOneByToken: (): User => mockedUser,
          },
        },
        {
          provide: ApplicationsService,
          useValue: {},
        },
      ],
    }).compile();

    authService = await moduleFixture.get(AuthService);
  });

  test('GIVEN unknown user THEN it throws BadRequestException', async () => {
    try {
      await authService.login({
        username: 'unknown_user',
        password: mockedUser.password,
      });
      throw new Error('BadRequestException was not thrown.');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const exception = error as BadRequestException;
      expect(exception.message).toBe('Unknown user');
    }
  });

  test('GIVEN wrong password THEN it throws BadRequestException', async () => {
    bcryptCompare.mockResolvedValue(false);
    try {
      await authService.login({
        username: mockedUser.username,
        password: 'wrong password',
      });
      throw new Error('BadRequestException was not thrown.');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const exception = error as BadRequestException;
      expect(exception.message).toBe('Wrong credentials provided');
    }
  });

  test('GIVEN correct logins THEN it returns user', async () => {
    const user = await authService.login({
      username: mockedUser.username,
      password: mockedUser.password,
    });
    expect(user).toBe(mockedUser);
  });
});

describe('AuthService: Login (user-token)', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
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
              (param.token === mockedUser.token ? mockedUser : null),
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
    authService = await moduleFixture.get(AuthService);
  });

  test('GIVEN invalid token THEN it throws BadRequestException', async () => {
    try {
      await authService.loginUserWithToken({ token: 'invalid-token' });
      throw new Error('BadRequestException was not thrown.');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const exception = error as BadRequestException;
      expect(exception.message).toBe('Invalid token');
    }
  });

  test('GIVEN unknown token THEN it throws BadRequestException', async () => {
    try {
      await authService.loginUserWithToken({ token: 'bearer unknown-token' });
      throw new Error('BadRequestException was not thrown.');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const exception = error as BadRequestException;
      expect(exception.message).toBe('Unknown user');
    }
  });

  test('GIVEN correct logins THEN it returns user', async () => {
    const user = await authService.loginUserWithToken({ token: `bearer ${mockedUser.token}` });
    expect(user).toBe(mockedUser);
  });
});
