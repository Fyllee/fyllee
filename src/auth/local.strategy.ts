import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import type { CleanUser } from '../global/types/clean-user.interface';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
  ) { super({ usernameField: 'username' }); }

  public async validate(username: string, password: string): Promise<CleanUser> {
    return await this.authService.login({ username, password });
  }
}
