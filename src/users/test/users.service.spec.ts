import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    usersService = await moduleFixture.get(UsersService);
  });

  test('GIVEN usersService THEN it is defined and has methods', () => {
    expect(usersService).toBeDefined();
    expect(usersService.create.name).toBe('create');
    expect(usersService.exists.name).toBe('exists');
    expect(usersService.findOne.name).toBe('findOne');
    expect(usersService.findOneByToken.name).toBe('findOneByToken');
  });
});
