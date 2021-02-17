import Content from '@/app/models/content';
import type { ApplicationDocument } from '@/app/types/models';
import removeContentFromDisk from './remove-content-from-disk';

export default async function removeAllContentsFromApplication(application: ApplicationDocument): Promise<void> {
  const contents = await Content.find({ application: application._id });
  if (contents.length === 0)
    return;

  for (const content of contents)
    await removeContentFromDisk(content); // eslint-disable-line no-await-in-loop

  await Content.deleteMany({ application: application._id });
}
