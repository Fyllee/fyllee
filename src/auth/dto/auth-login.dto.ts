import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({ required: true, example: 'Demo User' })
  username: string;

  @ApiProperty({ required: true, example: 'demo123' })
  password: string;
}
