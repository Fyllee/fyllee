import { promises as fs } from 'fs';
import { join } from 'path';
import constants from '@/app/config/constants';
import type { ContentPopulatedDocument } from '@/app/types/models';
import existsAsync from './exists-async';

export default async function removeContentFromDisk(content: ContentPopulatedDocument): Promise<void> {
  const filePath = join(constants.uploadPath, content.application.applicationId, content.savedName);
  const file = await existsAsync(filePath);

  if (file)
    await fs.unlink(filePath);
}
