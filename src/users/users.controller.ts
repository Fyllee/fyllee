import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTokenAuthGuard } from '../auth/user-token-auth.guard';
import { ApiDocumentation } from '../global/decorators';
import { DOCUMENTATION } from '../global/documentation';
import { UserRequest } from '../global/types/user-request.interface';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  @ApiDocumentation(DOCUMENTATION.USERS.FIND_ONE)
  @ApiBearerAuth()
  @UseGuards(UserTokenAuthGuard)
  @Get()
  public find(@Req() req: UserRequest): UserResponseDto {
    return req.user;
  }
}
