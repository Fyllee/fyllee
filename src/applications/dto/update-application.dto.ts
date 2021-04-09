import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, MaxLength } from 'class-validator';
import { CanBeEmpty } from '../../global/decorators/canBeEmpty.decorator';

export class UpdateApplicationDto {
  @ApiProperty({ required: false, example: 'Demo Application' })
  @MaxLength(50)
  @CanBeEmpty()
  displayName?: string;

  @ApiProperty({ required: false, example: 'demoapp.com' })
  @IsUrl()
  @CanBeEmpty()
  website?: string;

  @ApiProperty({ required: false, example: 'This app is a demo app!' })
  @MaxLength(500)
  @CanBeEmpty()
  description?: string;
}
