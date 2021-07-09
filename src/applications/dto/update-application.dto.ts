import { PartialType, PickType } from '@nestjs/swagger';
import { ApplicationDto } from './application.dto';

export class UpdateApplicationDto extends PartialType(PickType(ApplicationDto, ['displayName', 'website', 'description'])) {}
