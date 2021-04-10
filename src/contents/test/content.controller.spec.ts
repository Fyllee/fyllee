import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { Application } from '../../applications/application.entity';
import { ApplicationsService } from '../../applications/applications.service';
import { mockedApplication } from '../../applications/test/__mocks__/application.mock';
import { ApplicationTokenStrategy } from '../../auth/application-token.strategy';
import { AuthService } from '../../auth/auth.service';
import { mockedUser } from '../../auth/test/__mocks__/user.mock';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { Content } from '../content.entity';
import { ContentsController } from '../contents.controller';
import { ContentsService } from '../contents.service';
import { mockedContent } from './__mocks__/content.mock';

describe('ContentController', () => {
  let controller: ContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [
        ApplicationsService,
        ApplicationTokenStrategy,
        AuthService,
        ConfigService,
        ContentsService,
        UsersService,
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
          useValue: {
            findOne: (param: Partial<Content>): Content | null =>
              (param.contentId === mockedContent.contentId ? mockedContent : null),
            persistAndFlush: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(ContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
