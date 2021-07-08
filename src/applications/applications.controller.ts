import {
 Body,
 Controller,
 Delete,
 Get,
 Param,
 Patch,
 Post,
 Req,
 UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTokenAuthGuard } from '../auth/user-token-auth.guard';
import { ApiDocumentation, SerializerIncludeToken } from '../global/decorators';
import { DOCUMENTATION } from '../global/documentation';
import { UserRequest } from '../global/types/user-request.interface';
import type { Application } from './application.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(UserTokenAuthGuard)
@Controller({ path: 'applications', version: '1' })
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiDocumentation(DOCUMENTATION.APPLICATIONS.CREATE)
  @SerializerIncludeToken()
  @Post()
  public async create(@Req() req: UserRequest, @Body() dto: CreateApplicationDto): Promise<Application> {
    return await this.applicationsService.create(req.user.userId, dto);
  }

  @ApiDocumentation(DOCUMENTATION.APPLICATIONS.FIND_ALL)
  @Get()
  public async findAll(@Req() req: UserRequest): Promise<Application[]> {
    return await this.applicationsService.findAll(req.user.userId);
  }

  @ApiDocumentation(DOCUMENTATION.APPLICATIONS.FIND_ONE)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Application | null> {
    return await this.applicationsService.findOne(id);
  }

  @ApiDocumentation(DOCUMENTATION.APPLICATIONS.UPDATE)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateApplicationDto): Promise<Application> {
    return await this.applicationsService.update(id, dto);
  }

  @ApiDocumentation(DOCUMENTATION.APPLICATIONS.REMOVE_ONE)
  @Delete(':id')
  public async removeOne(@Param('id') id: string): Promise<void> {
    await this.applicationsService.removeOne(id);
  }
}
