import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ApplicationsService } from '../../applications/applications.service';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../local.strategy';
import { UserTokenStrategy } from '../user-token.strategy';
import { expectedUser, mockedUser } from './__mocks__/user.mock';

describe('AuthService: Register', () => {
  let authService: AuthService;
  let userExists: jest.SpyInstance<boolean | null>;

  beforeEach(async () => {
    userExists = jest.fn().mockReturnValue(null);

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
            exists: userExists,
            create: ({ username, email, password }: { username: string; email: string; password: string }): User =>
              new User(username, email, password),
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

  test('GIVEN already existing user THEN it throws BadRequestException', async () => {
    userExists.mockReturnValue(true);
    try {
      await authService.register({
        username: mockedUser.username,
        email: mockedUser.email,
        password: mockedUser.password,
      });
      throw new Error('BadRequestException was not thrown.');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const exception = error as BadRequestException;
      expect(exception.message).toBe('Account already exists');
    }
  });

  test('GIVEN correct data THEN it registers user', async () => {
    const user = await authService.register({
      username: mockedUser.username,
      email: mockedUser.email,
      password: mockedUser.password,
    });
    expect(user).toMatchObject({ ...expectedUser, createdAt: expect.any(Date), updatedAt: expect.any(Date) });
  });
});
