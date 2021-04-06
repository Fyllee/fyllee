import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    usersController = moduleFixture.get<UsersController>(UsersController);
  });

  it('GIVEN usersController THEN it is defined', () => {
    expect(usersController).toBeDefined();
  });
});
