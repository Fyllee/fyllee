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
import { StatusOk } from '../global/types/status.interface';
import { UserRequest } from '../global/types/user-request.interface';
import { cleanUser } from '../global/utils/clean-user';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  @ApiOkResponse({ description: 'Returns OK if the authentication succeeded and the data was sent' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if the token is invalid' })
  @ApiBearerAuth()
  @UseGuards(UserTokenAuthGuard)
  @Get()
  public find(@Req() req: UserRequest): StatusOk {
    return {
      status: 'OK',
      message: 'Data has been retrieved.',
      user: cleanUser(req.user),
    };
  }
}
