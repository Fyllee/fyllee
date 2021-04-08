import type { User } from '../../../users/user.entity';

export const mockedUser: User = {
  userId: 'abcdefg',
  token: 'a_very_very_very_long_and_secure_token.abcdefg',
  email: 'user@email.com',
  username: 'john',
  displayName: 'john',
  password: '$2y$10$/LH.0gTnnQVf0tZwcC4.5untTvIC3aJeNzGZYIWKx6MqqWGhorUZO ',
  createdAt: new Date(),
  updatedAt: new Date(),
};
