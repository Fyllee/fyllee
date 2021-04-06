import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StatusOk } from '../shared/types/status.interface';
import { UserRequest } from '../shared/types/user-request.interface';
import { cleanUser } from '../shared/utils/clean-user';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({ description: 'Returns OK if you are logged in' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if username or password was invalid' })
  @ApiBasicAuth()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200) // Overwrite the default "201 CREATED" for POST requests
  @Post('login')
  public login(@Req() req: UserRequest): StatusOk {
    return {
      status: 'OK',
      message: 'You have been logged in.',
      user: cleanUser(req.user),
    };
  }

  @ApiCreatedResponse({ description: 'Returns CREATED if your account has been created' })
  @ApiBadRequestResponse({ description: 'Returns BAD_REQUEST if the username/email is already taken' })
  @ApiInternalServerErrorResponse({ description: 'Returns INTERNAL_SERVER_ERROR if an unexpected error happened on the backend' })
  @Post('register')
  public async register(@Body() dto: AuthRegisterDto): Promise<StatusOk & { user: { token: string } }> {
    const user = await this.authService.register(dto);
    return {
      status: 'OK',
      message: 'Account has been created.',
      user: { ...cleanUser(user), token: user.token },
    };
  }
}
