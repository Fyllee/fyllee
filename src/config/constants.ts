import { join } from 'path';

export default {
  uploadPaths: {
    contents: join(process.cwd(), 'uploads/contents'),
    users: join(process.cwd(), 'uploads/users'),
    applications: join(process.cwd(), 'uploads/applications'),
  },
};
