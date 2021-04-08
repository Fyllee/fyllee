import { ApiProperty } from '@nestjs/swagger';
import {
  IsLowercase,
  IsOptional,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ required: true, example: 'demo_app' })
  // We keep IsLowercase and Length *with* the regex to have better error messages
  @IsLowercase()
  @Length(3, 50)
  @Matches(/[\w-]/)
  name: string;

  @ApiProperty({ required: false, example: 'Demo Application' })
  @Length(3, 50)
  @IsOptional()
  displayName?: string;

  @ApiProperty({ required: false, example: 'demoapp.com' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ required: false, example: 'This app is a demo app!' })
  @Length(1, 500)
  @IsOptional()
  description?: string;
}
