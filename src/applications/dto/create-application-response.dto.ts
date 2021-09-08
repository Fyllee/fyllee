import { IntersectionType, PickType } from '@nestjs/swagger';
import { ApplicationResponseDto } from './application-response.dto';
import { ApplicationDto } from './application.dto';

export class CreateApplicationResponseDto extends IntersectionType(
  ApplicationResponseDto,
  PickType(ApplicationDto, ['token']),
) {}
