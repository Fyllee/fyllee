import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ example: 'Demo User' })
  userId: string;

  @ApiProperty({ example: 'Demo User' })
  username: string;

  @ApiProperty({ example: 'demo123' })
  email: string;
}
