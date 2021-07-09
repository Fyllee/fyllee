import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { ApplicationDto } from './application.dto';

export class CreateApplicationDto extends
  IntersectionType(
    PartialType(PickType(ApplicationDto, ['displayName', 'website', 'description'])),
    PickType(ApplicationDto, ['name']),
  ) {}
