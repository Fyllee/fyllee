import { Collection } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsLowercase,
  IsNotEmpty,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import type { Content } from '../../contents/content.entity';
import { CanBeEmpty } from '../../global/decorators';
import type { Application } from '../application.entity';

export class ApplicationDto implements Omit<Application, 'getUploadPath' | 'owner'> {
  @ApiProperty({ description: 'The unique id of the application', example: 'ZWYDu15YPD' })
  applicationId: string;

  @ApiProperty({ description: 'The token of the application', example: 'bp8O8hHCpnRgsLBLChSGBz71IGwzNyRqBmb8AN9S3sND0EzaTjfcFK5mDTopDqOL.ZWYDu15YPD' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'The date the application was created at', example: '2021-07-09 15:46:37+02' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the last modification of the application was made at', example: '2021-07-09 15:46:37+02' })
  updatedAt: Date;

  @ApiProperty({ description: 'The name of the application', example: 'demo-app' })
  // We keep IsLowercase and Length *with* the regex to have better error messages
  @IsLowercase()
  @Length(3, 50)
  @Matches(/^[\w-]*$/)
  name: string;

  @ApiProperty({ description: 'The display name of the application', example: 'Demo App' })
  @MaxLength(50)
  @CanBeEmpty()
  displayName: string;

  @ApiProperty({ description: 'The description of the application', example: 'A demo application' })
  @MaxLength(500)
  @CanBeEmpty()
  description: string;

  @ApiProperty({ description: 'The website of the application', example: 'https://demo.app/home' })
  @IsUrl()
  @CanBeEmpty()
  website: string;

  @ApiProperty({ description: 'The contents of the application' })
  contents: Collection<Content>;

  @ApiProperty({ description: 'The ID of the owner of the application', example: 'ENYn60vwjp' })
  owner: string;
}
