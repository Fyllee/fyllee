import type { Request } from 'express';
import type { User } from '../../users/user.entity';

export interface UserRequest extends Request {
  user: User;
}
