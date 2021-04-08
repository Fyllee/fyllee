import { User } from '../../../users/user.entity';

export const mockedUser = new User('john', 'user@email.com', '$2y$10$/LH.0gTnnQVf0tZwcC4.5untTvIC3aJeNzGZYIWKx6MqqWGhorUZO');

const BCRYPT_REGEX = /^\$2[abxy]?\$10\$[\d./A-Za-z]{53}$/g;

export const expectedUser = {
  userId: expect.any(String),
  token: expect.any(String),
  email: 'user@email.com',
  username: 'john',
  displayName: 'john',
  password: expect.stringMatching(BCRYPT_REGEX),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};
