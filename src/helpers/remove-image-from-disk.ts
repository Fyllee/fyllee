import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '@/app/config/constants';
import type { ImageDocument } from '@/app/types/models';
import existsAsync from './exists-async';


export default async function removeImageFromDisk(image: ImageDocument): Promise<void> {
  const filePath = join(constants.uploadPath, image.application.id, image.savedName);
  const file = await existsAsync(filePath);

  if (file)
    await fs.unlink(filePath);
}
