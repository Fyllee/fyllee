import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiDocumentation, SerializerIncludeToken } from '../global/decorators';
import { DOCUMENTATION } from '../global/documentation';
import { UserRequest } from '../global/types/user-request.interface';
import { UserDto } from '../users/dto/user.dto';
import type { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiDocumentation(DOCUMENTATION.AUTH.LOGIN)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthLoginDto })
  @HttpCode(200) // Overwrite the default "201 CREATED" for POST requests
  @SerializerIncludeToken()
  @Post('login')
  public login(@Req() req: UserRequest): UserDto {
    return req.user;
  }

  @ApiDocumentation(DOCUMENTATION.AUTH.REGISTER)
  @SerializerIncludeToken()
  @Post('register')
  public async register(@Body() dto: AuthRegisterDto): Promise<User> {
    return await this.authService.register(dto);
  }
}
