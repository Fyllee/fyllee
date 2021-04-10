import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';
import type { CleanApplication } from '../global/types/clean-application.interface';
import { AuthService } from './auth.service';

@Injectable()
export class ApplicationTokenStrategy extends PassportStrategy(Strategy, 'application-token') {
  constructor(
    private readonly authService: AuthService,
  ) { super(); }

  public async validate(req: Request): Promise<CleanApplication> {
    if (req.headers.authorization) {
      const app = await this.authService.loginApplicationWithToken({ token: req.headers.authorization });
      // @ts-expect-error 2339: We want to create req.application, otherwise it will be mounted on req.user
      req.application = app;
      return app;
    }
    throw new BadRequestException('No Authorization header');
  }
}
