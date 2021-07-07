import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserTokenAuthGuard } from '../auth/user-token-auth.guard';
import { UserRequest } from '../global/types/user-request.interface';
import { User } from './user.entity';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  @ApiOkResponse({ description: 'Returns OK if the authentication succeeded and the data was sent' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if the token is invalid' })
  @ApiBearerAuth()
  @UseGuards(UserTokenAuthGuard)
  @Get()
  public find(@Req() req: UserRequest): User {
    return req.user;
  }
}
