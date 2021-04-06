import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    const moduleFixture = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOne },
        },
      ],
    }).compile();
    usersService = await moduleFixture.get(UsersService);
  });

  let user: User;
  beforeEach(() => {
    user = new User('test', 'test@test.com', 'test1234');
    findOne.mockReturnValue(Promise.resolve(user));
  });

  test('GIVEN existing username THEN returns user', async () => {
    const fetchedUser = await usersService.findOne('test');
    expect(fetchedUser).toEqual(user);
  });
});
