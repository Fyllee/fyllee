import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;
}
