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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Express, Response } from 'express';
import { ApplicationTokenAuthGuard } from '../auth/application-token-auth.guard';
import { Public } from '../global/decorators/public.decorator';
import mimeType from '../global/mime-type';
import { ApplicationRequest } from '../global/types/application-request.interface';
import type { ContentInformation } from '../global/types/content-information.interface';
import { fileFilter } from '../global/utils';
import { ImageFilterService } from '../image-filter/image-filter.service';
import type { Content } from './content.entity';
import { ContentsService } from './contents.service';
import { GetContentDto } from './dto/get-content.dto';

@ApiTags('Contents')
@ApiBearerAuth()
@UseGuards(ApplicationTokenAuthGuard)
@Controller('contents')
export class ContentsController {
  constructor(
    private readonly contentService: ContentsService,
    private readonly imageFilterService: ImageFilterService,
  ) {}

  @ApiCreatedResponse({ description: 'Returns CREATED if the creation succeeded and the data was sent back correctly' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if no Authorization header was provided, or if no file was provided, or if the file type is invalid' })
  @ApiUnauthorizedResponse({ description: 'Returns UNAUTHORIZE if the provided Authorization header is invalid' })
  @ApiPayloadTooLargeResponse({ description: "Returns PAYLOAD_TOO_LARGE if the given file's size exceeds the maximum limit" })
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

  @ApiOkResponse({ description: 'Returns OK if the data was sent back correctly' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if no Authorization header was provided' })
  @Get()
  public async findAll(@Req() req: ApplicationRequest): Promise<Content[]> {
    return await this.contentService.findAll(req.application.applicationId);
  }

  @ApiOkResponse({ description: 'Returns OK if the file was sent back correctly' })
  @ApiNotFoundResponse({ description: 'Returns NOT_FOUND if no file with the given ID is found' })
  @Public()
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  @Get(':id')
  public async findOne(@Param('id') id: string, @Query() query: GetContentDto, @Res() res: Response): Promise<void> {
    const content = await this.contentService.findOne(id);

    if (content.mimeType.split('/')[0] !== 'image') {
      res.sendFile(`${content.application.applicationId}/${content.savedName}`, { root: 'uploads' });
      return;
    }

    // TODO: Put the image process job in a queue?
    const modifiedImage = await this.imageFilterService.modifyImage(content, query);

    res.set('Content-Type', content.mimeType);
    res.send(modifiedImage);
  }

  @ApiOkResponse({ description: 'Returns OK if the file was sent back correctly' })
  @ApiNotFoundResponse({ description: 'Returns NOT_FOUND if no file with the given ID is found' })
  @Get(':id/information')
  public async findInformation(@Param('id') id: string): Promise<ContentInformation> {
    return await this.contentService.findInformation(id);
  }

  @ApiOkResponse({ description: 'Returns OK if the delete succeeded' })
  @ApiNotFoundResponse({ description: 'Returns NOT_FOUND if no file with the given ID is found' })
  @Delete(':id')
  public async removeOne(@Param('id') id: string): Promise<void> {
    await this.contentService.removeOne(id);
  }
}
