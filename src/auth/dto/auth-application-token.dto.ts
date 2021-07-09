import { PickType } from '@nestjs/swagger';
import { ApplicationDto } from '../../applications/dto/application.dto';

export class AuthApplicationTokenDto extends PickType(ApplicationDto, ['token']) {}
