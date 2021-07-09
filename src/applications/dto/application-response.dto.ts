import { PickType } from '@nestjs/swagger';
import { ApplicationDto } from './application.dto';

export class ApplicationResponseDto extends PickType(ApplicationDto, ['applicationId', 'name', 'displayName', 'website', 'description', 'owner']) {}
