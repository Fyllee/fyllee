import {
  Controller,
  Delete,
  Get,
  PreconditionFailedException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicationsService } from '../applications/applications.service';
import { UserTokenAuthGuard } from '../auth/user-token-auth.guard';
import { ApiDocumentation } from '../global/decorators';
import { DOCUMENTATION } from '../global/documentation';
import { UserRequest } from '../global/types/user-request.interface';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller({ path: ['user', 'users'], version: '1' })
export class UsersController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly usersService: UsersService,
  ) {}

  @ApiDocumentation(DOCUMENTATION.USERS.FIND_ONE)
  @ApiBearerAuth()
  @UseGuards(UserTokenAuthGuard)
  @Get()
  public findOne(@Req() req: UserRequest): UserResponseDto {
    return req.user;
  }

  @ApiDocumentation(DOCUMENTATION.USERS.REMOVE_ONE)
  @ApiBearerAuth()
  @UseGuards(UserTokenAuthGuard)
  @Delete()
  public async removeOne(@Req() req: UserRequest): Promise<UserResponseDto> {
    const applications = await this.applicationsService.findAll(req.user.userId);
    if (applications.length > 0)
      throw new PreconditionFailedException('User owns applications.');

    await this.usersService.removeOne(req.user.userId);
    return req.user;
  }
}
