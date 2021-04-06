import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';
import type { CleanUser } from '../shared/types/clean-user.interface';
import { AuthService } from './auth.service';

@Injectable()
export class UserTokenStrategy extends PassportStrategy(Strategy, 'user-token') {
  constructor(
    private readonly authService: AuthService,
  ) { super(); }

  public async validate(req: Request): Promise<CleanUser> {
    if (req.headers.authorization)
      return await this.authService.loginWithToken({ token: req.headers.authorization });
    throw new BadRequestException('No Authorization header');
  }
}
