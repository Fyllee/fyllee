import { getRepositoryToken } from '@mikro-orm/nestjs';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { mockedUser } from './__mocks__/user.mock';

jest.mock('bcrypt');

describe('AuthService: Login (local)', () => {
  let authService: AuthService;
  let bcryptCompare: jest.SpyInstance<Promise<boolean>>;
  beforeEach(async () => {
    bcryptCompare = jest.spyOn(bcrypt, 'compare').mockReturnValue(Promise.resolve(true));

    const moduleFixture = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
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
    bcryptCompare.mockReturnValue(Promise.resolve(false));
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
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: (param: Partial<User>): User | null =>
              (param.token === mockedUser.token ? mockedUser : null),
          },
        },
      ],
    }).compile();
    authService = await moduleFixture.get(AuthService);
  });

  test('GIVEN invalid token THEN it throws BadRequestException', async () => {
    try {
      await authService.loginWithToken({ token: 'invalid-token' });
      throw new Error('BadRequestException was not thrown.');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const exception = error as BadRequestException;
      expect(exception.message).toBe('Invalid token');
    }
  });

  test('GIVEN unknown token THEN it throws BadRequestException', async () => {
    try {
      await authService.loginWithToken({ token: 'bearer unknown-token' });
      throw new Error('BadRequestException was not thrown.');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const exception = error as BadRequestException;
      expect(exception.message).toBe('Unknown user');
    }
  });

  test('GIVEN correct logins THEN it returns user', async () => {
    const user = await authService.loginWithToken({ token: `bearer ${mockedUser.token}` });
    expect(user).toBe(mockedUser);
  });
});
