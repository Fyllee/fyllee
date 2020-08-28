import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '../config/constants';


export default async function removeImageFromDisk(image) {
  const filePath = join(constants.uploadPath, image.application.id, image.savedName);
  // FIXME: fs.stat returns an error if no folder is found, not a boolean
  const file = await fs.stat(filePath);

  if (file)
    await fs.unlink(filePath);
}
