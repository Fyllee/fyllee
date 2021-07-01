import path from 'path';
import { Injectable } from '@nestjs/common';
import type { Sharp } from 'sharp';
import sharp from 'sharp';
import type { Content } from '../contents/content.entity';
import type { Filters, ParsedQs } from '../global/types/filter-names.type';
import {
  floatOrUndefined,
  intOrUndefined,
  notUndef,
  validateNumber,
} from '../global/utils';

@Injectable()
export class ImageFilterService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static readonly MAX_PIXEL_SIZE = 10_000;

  public parseQueries(queries: ParsedQs): Filters {
    return {
      blur: intOrUndefined(queries.blur),
      pixelate: intOrUndefined(queries.pixelate),
      opacity: intOrUndefined(queries.opacity),
      contrast: floatOrUndefined(queries.contrast),
      rotate: intOrUndefined(queries.rotate),
      greyscale: String(queries.greyscale) === 'true',
      sepia: String(queries.sepia) === 'true',
      opaque: String(queries.opaque) === 'true',
      mirror: String(queries.mirror),
      width: intOrUndefined(queries.width),
      height: intOrUndefined(queries.height),
    };
  }

  public async modifyImage(image: Content, requestedFilters: Partial<Filters>): Promise<Buffer> {
    let sharpImage = this.getSharpImage(image);

    if (notUndef(requestedFilters.blur) && validateNumber(requestedFilters.blur, 1, ImageFilterService.MAX_PIXEL_SIZE))
      sharpImage.blur(requestedFilters.blur);

    if (notUndef(requestedFilters.pixelate)
      && validateNumber(requestedFilters.pixelate, 1, ImageFilterService.MAX_PIXEL_SIZE)) {
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
      if (requestedFilters.mirror === 'horizontal')
        sharpImage.flop();
      else if (requestedFilters.mirror === 'vertical')
        sharpImage.flip();
      else if (requestedFilters.mirror === 'both')
        sharpImage.flip().flop();
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
