import { OmitType } from '@nestjs/swagger';
import { AuthUserResponseDto } from '../../auth/dto/auth-user-response.dto';

export class UserResponseDto extends OmitType(AuthUserResponseDto, ['token']) {}
