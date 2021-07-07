import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { Application } from '../../applications/application.entity';
import { mockedApplication } from '../../applications/test/__mocks__/application.mock';
import { ContentController } from '../content.controller';
import { Content } from '../content.entity';
import { ContentsService } from '../contents.service';
import { mockedContent } from './__mocks__/content.mock';

describe('ContentController', () => {
  let controller: ContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        ConfigService,
        ContentsService,
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

    controller = module.get(ContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
