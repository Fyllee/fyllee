import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  Length,
  Matches,
} from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({ required: true, example: 'demo_user' })
  // We keep IsLowercase and Length *with* the regex to have better error messages
  @IsLowercase()
  @Length(3, 50)
  @Matches(/[\w-]/)
  username: string;

  @ApiProperty({ required: true, example: 'demo@demo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'demo123' })
  @Length(6, 100)
  password: string;
}
