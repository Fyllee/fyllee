import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Length, NotContains } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ required: true, example: 'Demo User' })
  @IsAlphanumeric()
  @Length(3, 50)
  username: string;

  @ApiProperty({ required: true, example: 'demo123' })
  @NotContains(' ', { message: 'password should not contain a space' })
  @Length(6, 100)
  password: string;
}
