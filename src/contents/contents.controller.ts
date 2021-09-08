import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { Express, Response } from 'express';
import { ApplicationTokenAuthGuard } from '../auth/application-token-auth.guard';
import { ApiDocumentation, ApplyToAll, Public } from '../global/decorators';
import { DOCUMENTATION } from '../global/documentation';
import mimeType from '../global/mime-type';
import { ApplicationRequest } from '../global/types/application-request.interface';
import type { ContentInformation } from '../global/types/content-information.interface';
import { fileFilter } from '../global/utils';
import { ImageFilterService } from '../image-filter/image-filter.service';
import type { Content } from './content.entity';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { GetContentDto } from './dto/get-content.dto';

@ApiTags('Contents')
@ApplyToAll(ApiBearerAuth(), { exclude: ['findOne'] })
@UseGuards(ApplicationTokenAuthGuard)
@Controller({ path: 'contents', version: '1' })
export class ContentsController {
  constructor(
    private readonly contentService: ContentsService,
    private readonly imageFilterService: ImageFilterService,
  ) {}

  @ApiDocumentation(DOCUMENTATION.CONTENTS.CREATE)
  @ApiBody({ type: CreateContentDto })
  @ApiConsumes(...Object.values(mimeType.types))
  @UseInterceptors(FileInterceptor('file', { limits: { files: 1 }, fileFilter }))
  @Post()
  public async create(
    @Req() req: ApplicationRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Content> {
    if (!file)
      throw new BadRequestException('No file provided');
    return await this.contentService.create(req.application.applicationId, file);
  }

  @ApiDocumentation(DOCUMENTATION.CONTENTS.FIND_ALL)
  @Get()
  public async findAll(@Req() req: ApplicationRequest): Promise<Content[]> {
    return await this.contentService.findAll(req.application.applicationId);
  }

  @ApiDocumentation(DOCUMENTATION.CONTENTS.FIND_ONE)
  @Public()
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  @Get(':id')
  public async findOne(@Param('id') id: string, @Query() query: GetContentDto, @Res() res: Response): Promise<void> {
    const content = await this.contentService.findOne(id);
    res.header('Content-Type', content.mimeType);

    if (content.mimeType.split('/')[0] !== 'image' || Object.keys(query).length === 0) {
      res.sendFile(content.getUploadPath());
    } else {
      // TODO: Put the image process job in a queue?
      const modifiedImage = await this.imageFilterService.modifyImage(content, query);
      res.send(modifiedImage);
    }
  }

  @ApiDocumentation(DOCUMENTATION.CONTENTS.FIND_INFORMATION)
  @Get(':id/information')
  public async findInformation(@Param('id') id: string): Promise<ContentInformation> {
    return await this.contentService.findInformation(id);
  }

  @ApiDocumentation(DOCUMENTATION.CONTENTS.REMOVE_ONE)
  @Delete(':id')
  public async removeOne(@Param('id') id: string): Promise<void> {
    await this.contentService.removeOne(id);
  }
}
