import type { User } from '../../../users/user.entity';

export const mockedUser: User = {
  userId: 'abcdefg',
  token: 'a_very_very_very_long_and_secure_token.abcdefg',
  email: 'user@email.com',
  username: 'john',
  displayName: 'john',
  password: '$2y$10$/LH.0gTnnQVf0tZwcC4.5untTvIC3aJeNzGZYIWKx6MqqWGhorUZO',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const BCRYPT_REGEX = /^\$2[abxy]?\$10\$[\d./A-Za-z]{53}$/g;

export const expectedUser: User = {
  userId: expect.any(String),
  token: expect.any(String),
  email: 'user@email.com',
  username: 'john',
  displayName: 'john',
  password: expect.stringMatching(BCRYPT_REGEX),
  createdAt: expect.any(Number),
  updatedAt: expect.any(Number),
};
