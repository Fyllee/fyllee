import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ description: 'The HTTP error status code' })
  statusCode: number;

  @ApiProperty({ description: 'The error message' })
  message: string;

  @ApiProperty({ description: 'The HTTP error name' })
  error: string;
}
