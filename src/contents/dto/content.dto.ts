import { ApiProperty } from '@nestjs/swagger';
import type { Content } from '../content.entity';

export class ContentDto implements Omit<Content, 'application' | 'getUploadPath' | 'toJSON'> {
  @ApiProperty({ description: 'The unique id of the content' })
  contentId: string;

  @ApiProperty({ description: 'The date the content was created at' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the last modification of the content was made at' })
  updatedAt: Date;

  @ApiProperty({ description: 'The original name of the content' })
  originalName: string;

  @ApiProperty({ description: 'The name under which the content was saved at' })
  savedName: string;

  @ApiProperty({ description: 'The mime type of the content' })
  mimeType: string;

  @ApiProperty({ description: 'The size of the content in bytes' })
  size: number;

  @ApiProperty({ description: 'The id of the application of the content' })
  application: string;
}
