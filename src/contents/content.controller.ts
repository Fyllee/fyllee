import {
  Controller,
  Get,
  Param,
  Res,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ContentsService } from './contents.service';

@ApiTags('Content')
@Controller({ path: ['content', 'c'], version: VERSION_NEUTRAL })
export class ContentController {
  constructor(
    private readonly contentService: ContentsService,
  ) {}

  @ApiOkResponse({ description: 'Returns OK if the file was sent back correctly' })
  @ApiNotFoundResponse({ description: 'Returns NOT_FOUND if no file with the given ID is found' })
  @Get(':id')
  public async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const content = await this.contentService.findOne(id);
    res.header('Content-Type', content.mimeType);
    res.sendFile(`${content.application.applicationId}/${content.savedName}`, { root: 'uploads' });
  }
}
