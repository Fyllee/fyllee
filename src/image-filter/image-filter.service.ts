import path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Sharp } from 'sharp';
import sharp from 'sharp';
import type { Content } from '../contents/content.entity';
import type { GetContentDto } from '../contents/get-content.dto';
import { notUndef, validateNumber } from '../global/utils';

@Injectable()
export class ImageFilterService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  public async modifyImage(image: Content, requestedFilters: Partial<GetContentDto>): Promise<Buffer> {
    let sharpImage = this.getSharpImage(image);
    const maxPixelSize = this.configService.get<number>('maxPixelSize');

    if (notUndef(requestedFilters.blur) && validateNumber(requestedFilters.blur, 1, maxPixelSize))
      sharpImage.blur(requestedFilters.blur);

    if (notUndef(requestedFilters.pixelate)
      && validateNumber(requestedFilters.pixelate, 1, maxPixelSize)) {
      const { width, height } = await sharpImage.metadata();
      if (width) {
        sharpImage = sharp(
          await sharpImage
            .resize(Math.floor(width / requestedFilters.pixelate), null, { kernel: sharp.kernel.nearest })
            .toBuffer(),
        ).resize({ width, height, kernel: sharp.kernel.nearest });
      }
    }

    // FIXME: Should the maximum value be 2?
    if (notUndef(requestedFilters.opacity) && validateNumber(requestedFilters.opacity, 0, 2))
      sharpImage.ensureAlpha(requestedFilters.opacity);

    if (notUndef(requestedFilters.contrast) && validateNumber(requestedFilters.contrast, -1, 1))
      sharpImage.linear(requestedFilters.contrast, -(128 * requestedFilters.contrast) + 128);

    if (notUndef(requestedFilters.rotate) && validateNumber(requestedFilters.rotate, -360, 360))
      sharpImage.rotate(requestedFilters.rotate);

    if (requestedFilters.greyscale)
      sharpImage.greyscale();

    if (requestedFilters.sepia) {
      sharpImage.recomb([
        [0.359, 0.704, 0.136],
        [0.299, 0.587, 0.114],
        [0.239, 0.469, 0.091],
      ]);
    }

    if (requestedFilters.opaque)
      sharpImage.removeAlpha();

    if (notUndef(requestedFilters.mirror)) {
      switch (requestedFilters.mirror) {
        case 'horizontal':
          sharpImage.flop();
          break;
        case 'vertical':
          sharpImage.flip();
          break;
        case 'both':
          sharpImage.flip().flop();
          break;
      }
    }

    if (notUndef(requestedFilters.width) || notUndef(requestedFilters.height))
      sharpImage.resize({ width: requestedFilters.width, height: requestedFilters.height, fit: 'fill' });

    return await sharpImage.toBuffer();
  }

  private getSharpImage(image: Content): Sharp {
    const imagePath = path.join(
      path.resolve('./'), 'uploads',
      image.application.applicationId,
      image.savedName,
    );
    return sharp(imagePath);
  }
}
