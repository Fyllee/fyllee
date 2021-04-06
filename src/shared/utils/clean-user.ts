import type { User } from '../../users/user.entity';
import type { CleanUser } from '../types/clean-user.interface';

export function cleanUser(user: User): CleanUser {
  const {
    password,
    createdAt,
    updatedAt,
    token,
    ...clean
  } = user;
  return clean;
}
