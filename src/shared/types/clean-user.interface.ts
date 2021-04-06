import type { User } from '../../users/user.entity';

export type CleanUser = Omit<User, 'createdAt' | 'password' | 'token' | 'updatedAt'>;
