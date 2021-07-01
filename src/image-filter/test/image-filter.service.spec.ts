import { ConfigService } from '@nestjs/config';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ImageFilterService } from '../image-filter.service';

describe('ImageFilterService', () => {
  let service: ImageFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageFilterService, ConfigService],
    }).compile();

    service = module.get(ImageFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
