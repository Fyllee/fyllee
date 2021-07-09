import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthLoginDto extends PickType(UserDto, ['username', 'password']) {}
