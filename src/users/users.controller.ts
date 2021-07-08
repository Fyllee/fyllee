import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTokenAuthGuard } from '../auth/user-token-auth.guard';
import { ApiDocumentation } from '../global/decorators/document.decorator';
import { DOCUMENTATION } from '../global/documentation';
import { UserRequest } from '../global/types/user-request.interface';
import { User } from './user.entity';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  @ApiDocumentation(DOCUMENTATION.USERS.FIND_ONE)
  @ApiBearerAuth()
  @UseGuards(UserTokenAuthGuard)
  @Get()
  public find(@Req() req: UserRequest): User {
    return req.user;
  }
}
