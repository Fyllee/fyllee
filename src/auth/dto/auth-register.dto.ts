import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthRegisterDto extends PickType(UserDto, ['username', 'email', 'password']) {}
