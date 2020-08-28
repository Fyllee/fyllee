import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '../config/constants';
import existsAsync from './exists-async';


export default async function removeImageFromDisk(image) {
  const filePath = join(constants.uploadPath, image.application.id, image.savedName);
  const file = await existsAsync(filePath);

  if (file)
    await fs.unlink(filePath);
}
