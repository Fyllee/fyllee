import { getRepositoryToken } from '@mikro-orm/nestjs';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { mockedUser } from '../../auth/test/__mocks__/user.mock';
import { UserTokenStrategy } from '../../auth/user-token.strategy';
import { Content } from '../../contents/content.entity';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { Application } from '../application.entity';
import { ApplicationsService } from '../applications.service';
import { mockedApplication } from './__mocks__/application.mock';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        {
          provide: getRepositoryToken(Content),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get(ApplicationsService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
