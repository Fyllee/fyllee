import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '../config/constants';
import existsAsync from './exists-async';
import removeAllImagesFromApplication from './remove-all-images-from-application';

export default async function removeApplicationFromDisk(application) {
  const folderPath = join(constants.uploadPath, application.id);
  const folder = await existsAsync(folderPath);

  if (folder) {
    await removeAllImagesFromApplication(application);
    await fs.rmdir(folderPath);
  }
}
