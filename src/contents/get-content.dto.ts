import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import config from '../config';

type BooleanString = 'false' | 'true';

export class GetContentDto {
  @ApiProperty({ required: false, maximum: config().maxPixelSize, minimum: 1 })
  @IsInt()
  @Min(1)
  @Max(config().maxPixelSize)
  @IsOptional()
  @Type(() => Number)
  blur?: number;

  @ApiProperty({ required: false, maximum: config().maxPixelSize, minimum: 1 })
  @IsInt()
  @Min(1)
  @Max(config().maxPixelSize)
  @IsOptional()
  @Type(() => Number)
  pixelate?: number;

  @ApiProperty({ required: false, maximum: 2, minimum: 0 })
  @IsInt()
  @Min(0)
  @Max(2)
  @IsOptional()
  @Type(() => Number)
  opacity?: number;

  @ApiProperty({ required: false, maximum: 1, minimum: -1 })
  @IsNumber()
  @Min(-1)
  @Max(1)
  @IsOptional()
  @Type(() => Number)
  contrast?: number;

  @ApiProperty({ required: false, maximum: 360, minimum: -360 })
  @IsInt()
  @Min(-360)
  @Max(360)
  @IsOptional()
  @Type(() => Number)
  rotate?: number;

  @ApiProperty({ required: false, enum: ['true', 'false'] })
  @IsBooleanString()
  @IsOptional()
  greyscale?: BooleanString;

  @ApiProperty({ required: false, enum: ['true', 'false'] })
  @IsBooleanString()
  @IsOptional()
  sepia?: BooleanString;

  @ApiProperty({ required: false, enum: ['true', 'false'] })
  @IsBooleanString()
  @IsOptional()
  opaque?: BooleanString;

  @ApiProperty({ required: false, enum: ['horizontal', 'vertical', 'both'] })
  @IsString()
  @IsIn(['horizontal', 'vertical', 'both'])
  @IsOptional()
  mirror?: 'both' | 'horizontal' | 'vertical';

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  width?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  height?: number;
}
