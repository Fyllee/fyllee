import { Collection } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import type { Application } from '../../applications/application.entity';
import type { User } from '../user.entity';

export class UserDto implements User {
  @ApiProperty({ description: 'The unique id of the user' })
  userId: string;

  @ApiProperty({ description: 'The token of the user' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'The date the account was created at' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the last modification of the account was made at' })
  updatedAt: Date;

  @ApiProperty({ description: 'The username of the user' })
  // We keep IsLowercase and Length *with* the regex to have better error messages
  @IsLowercase()
  @Length(3, 50)
  @Matches(/^[\w-]*$/)
  username: string;

  @ApiProperty({ description: 'The email adress of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @Length(6, 100)
  password: string;

  @ApiProperty({ description: 'The display name of the user' })
  displayName: string;

  @ApiProperty({ description: 'The applications of the user' })
  applications: Collection<Application>;
}
