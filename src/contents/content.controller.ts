import {
  Controller,
  Get,
  Param,
  Res,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiDocumentation } from '../global/decorators';
import { DOCUMENTATION } from '../global/documentation';
import { ContentsService } from './contents.service';

@ApiTags('Content')
@Controller({ path: ['content', 'c'], version: VERSION_NEUTRAL })
export class ContentController {
  constructor(
    private readonly contentService: ContentsService,
  ) {}

  @ApiDocumentation(DOCUMENTATION.CONTENT.FIND_ONE)
  @Get(':id')
  public async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const content = await this.contentService.findOne(id);
    res.header('Content-Type', content.mimeType);
    res.sendFile(`${content.application.applicationId}/${content.savedName}`, { root: 'uploads' });
  }
}
