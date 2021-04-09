import {
 Body,
 Controller,
 Delete,
 Get,
 Param,
 Patch,
 Post,
 Req,
 SerializeOptions,
 UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserTokenAuthGuard } from '../auth/user-token-auth.guard';
import { UserRequest } from '../global/types/user-request.interface';
import type { Application } from './application.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(UserTokenAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiCreatedResponse({ description: 'Returns CREATED if the creation succeeded and the data was sent' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if no Authorization header was provided' })
  @SerializeOptions({ groups: ['TokenIncluded'] })
  @Post()
  public async create(@Req() req: UserRequest, @Body() dto: CreateApplicationDto): Promise<Application> {
    return await this.applicationsService.create(req.user.userId, dto);
  }

  @ApiOkResponse({ description: 'Returns OK if the authentication succeeded and the data was sent' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if no Authorization header was provided' })
  @Get()
  public async findAll(@Req() req: UserRequest): Promise<Application[]> {
    return await this.applicationsService.findAll(req.user.userId);
  }

  @ApiOkResponse({ description: 'Returns OK if the authentication succeeded and the data was sent' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if no Authorization header was provided' })
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Application | null> {
    return await this.applicationsService.findOne(id);
  }

  @ApiOkResponse({ description: 'Returns OK if the authentication succeeded and the data was sent' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if no Authorization header was provided' })
  @ApiNotFoundResponse({ description: 'Returns NOT_FOUND if no application with the provided id is found' })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateApplicationDto): Promise<Application> {
    return await this.applicationsService.update(id, dto);
  }

  @ApiOkResponse({ description: 'Returns OK if the authentication succeeded and the data was sent' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if no Authorization header was provided' })
  @ApiNotFoundResponse({ description: 'Returns NOT_FOUND if no application with the provided id is found' })
  @Delete(':id')
  public async removeOne(@Param('id') id: string): Promise<void> {
    await this.applicationsService.removeOne(id);
  }
}
