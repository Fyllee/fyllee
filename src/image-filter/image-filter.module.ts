import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImageFilterService } from './image-filter.service';

@Module({
  providers: [ImageFilterService, ConfigService],
})
export class ImageFilterModule {}
