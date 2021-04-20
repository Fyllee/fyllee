import { Module } from '@nestjs/common';
import { ImageFilterService } from './image-filter.service';

@Module({
  providers: [ImageFilterService],
})
export class ImageFilterModule {}
