import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsLowercase,
  Length,
} from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({ required: true, example: 'Demo User' })
  @IsAlphanumeric()
  @Length(3, 50)
  @IsLowercase()
  username: string;

  @ApiProperty({ required: true, example: 'demo@demo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'demo123' })
  @Length(6, 100)
  password: string;
}
