import { promises as fs } from 'fs';

export default async function existsAsync(path) {
  try {
    await fs.stat(path);
  } catch (err) {
    if (err.code === 'ENOENT')
      return false;
  }
  return true;
}
