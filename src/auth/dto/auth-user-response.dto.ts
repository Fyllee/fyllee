import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthUserResponseDto extends PickType(UserDto, ['userId', 'token', 'username', 'email', 'displayName']) {}
