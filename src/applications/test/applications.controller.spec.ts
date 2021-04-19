import { getRepositoryToken } from '@mikro-orm/nestjs';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { mockedUser } from '../../auth/test/__mocks__/user.mock';
import { UserTokenStrategy } from '../../auth/user-token.strategy';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { Application } from '../application.entity';
import { ApplicationsController } from '../applications.controller';
import { ApplicationsService } from '../applications.service';
import { mockedApplication } from './__mocks__/application.mock';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        AuthService,
        ApplicationsService,
        UsersService,
        UserTokenStrategy,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: (param: Partial<User>): Application | null =>
              (param.username === mockedUser.username ? mockedApplication : null),
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
      ],
    }).compile();

    controller = module.get(ApplicationsController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
