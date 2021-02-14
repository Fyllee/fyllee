import path from 'path';
import Jimp from 'jimp';
import constants from '@/app/config/constants';
import validateNumber from '@/app/helpers/validate-number';
import type { FilterNames, ParsedQs, RequestedFilters } from '@/app/types/index';
import { filterNames } from '@/app/types/index';
import type { ImagePopulatedDocument } from '@/app/types/models';

export default class FilterManager {
  public jimpImage: Jimp;
  protected readonly maxPixelSize = 10_000;
  private _requestedFilters: Partial<RequestedFilters>;

  constructor(
    private readonly _rawQueries: ParsedQs,
    private readonly _image: ImagePopulatedDocument,
  ) {}

  public async run(): Promise<Buffer> {
    // TODO: Bypass JIMP if there are no queries.
    this._parseQueries();

    this.jimpImage = await this._getJimpImage();
    this._analyseQueries();

    return await this.jimpImage.getBufferAsync(this.jimpImage.getMIME());
  }

  private _parseQueries(): void {
    this._requestedFilters = Object.fromEntries(
      Object
        .entries(this._rawQueries)
        .filter((
            filtersOptions: [query: string, parameter: unknown],
          ): filtersOptions is [filter: FilterNames, option: string] =>
            // eslint-disable-next-line implicit-arrow-linebreak
            filterNames.includes(filtersOptions[0]) && typeof filtersOptions[1] === 'string'),
    ) as Record<FilterNames, string>;
  }

  private _analyseQueries(): void {
    const resize: Record<'height' | 'width', number> = {
      height: Jimp.AUTO,
      width: Jimp.AUTO,
    };

    const entries = Object.entries(this._requestedFilters) as Array<[name: FilterNames, value: string]>;
    for (const [name, value] of entries) {
      const valueAsFloat = Number.parseFloat(value);
      const valueAsInt = Number.parseInt(value, 10);

      switch (name) {
        case 'blur':
          if (validateNumber(valueAsInt, 1, this.maxPixelSize))
            this.jimpImage.blur(valueAsInt);
          break;

        case 'pixelate':
          if (validateNumber(valueAsInt, 1, this.maxPixelSize))
            this.jimpImage.pixelate(valueAsInt);
          break;

        case 'opacity':
          if (validateNumber(valueAsFloat, 0, 1))
            this.jimpImage.opacity(valueAsFloat);
          break;

        case 'contrast':
          if (validateNumber(valueAsFloat, -1, 1))
            this.jimpImage.contrast(valueAsFloat);
          break;

        case 'greyscale':
          if (value === 'true')
            this.jimpImage.greyscale();
          break;

        case 'width':
        case 'height': {
          const max = name === 'width' ? this.jimpImage.getWidth() : this.jimpImage.getHeight();
          if (validateNumber(valueAsInt, 0, max))
            resize[name] = valueAsInt;
          break;
        }
      }
    }

    if (resize.width !== Jimp.AUTO || resize.height !== Jimp.AUTO)
      this.jimpImage.resize(resize.width, resize.height);
  }

  private async _getJimpImage(): Promise<Jimp> {
    const imagePath = path.join(
      constants.uploadPath,
      this._image.application.applicationId,
      this._image.savedName,
    );
    return await Jimp.read(imagePath);
  }
}
