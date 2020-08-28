import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '../config/constants';
import removeAllImagesFromApplication from './remove-all-images-from-application';

export default async function removeApplicationFromDisk(application) {
  const folderPath = join(constants.uploadPath, application.id);
  // FIXME: fs.stat returns an error if no folder is found, not a boolean
  const folder = await fs.stat(folderPath);
  if (folder) {
    await removeAllImagesFromApplication(application);
    await fs.rmdir(folderPath);
  }
}
