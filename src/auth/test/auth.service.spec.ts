import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    authService = await moduleFixture.get(AuthService);
  });

  test('GIVEN authService THEN it is defined', () => {
    expect(authService).toBeDefined();
  });
});
