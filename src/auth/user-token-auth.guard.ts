import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserTokenAuthGuard extends AuthGuard('user-token') {}
