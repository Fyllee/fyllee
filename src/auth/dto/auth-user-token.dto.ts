import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthUserTokenDto extends PickType(UserDto, ['token']) {}
