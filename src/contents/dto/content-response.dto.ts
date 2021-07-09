import { OmitType } from '@nestjs/swagger';
import { ContentDto } from './content.dto';

export class ContentResponseDto extends OmitType(ContentDto, ['createdAt', 'updatedAt']) {}
