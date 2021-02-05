import { promises as fs } from 'fs';

export default async function existsAsync(path: string): Promise<boolean> {
  try {
    await fs.stat(path);
  } catch (unknownError: unknown) {
    type StatError = Error & { errno: number; code: string; syscall: 'stat'; path: string };
    if ((unknownError as StatError).code === 'ENOENT')
      return false;
  }
  return true;
}
