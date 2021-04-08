import type { CleanUser } from './clean-user.interface';

export interface StatusOk {
  status: 'OK';
  message: string;
  user: CleanUser;
}
