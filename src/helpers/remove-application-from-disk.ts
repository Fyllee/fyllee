import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '@/app/config/constants';
import type { ApplicationDocument } from '@/app/types/models';
import existsAsync from './exists-async';
import removeAllImagesFromApplication from './remove-all-images-from-application';

export default async function removeApplicationFromDisk(application: ApplicationDocument): Promise<void> {
  const folderPath = join(constants.uploadPath, application.applicationId);
  const folder = await existsAsync(folderPath);

  if (folder) {
    await removeAllImagesFromApplication(application);
    await fs.rmdir(folderPath);
  }
}
