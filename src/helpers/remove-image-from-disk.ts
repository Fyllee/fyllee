import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '@/app/config/constants';
import type { ImagePopulatedDocument } from '@/app/types/models';
import existsAsync from './exists-async';


export default async function removeImageFromDisk(image: ImagePopulatedDocument): Promise<void> {
  const filePath = join(constants.uploadPath, image.application.applicationId, image.savedName);
  const file = await existsAsync(filePath);

  if (file)
    await fs.unlink(filePath);
}