import Image from '../models/image';
import type { ApplicationDocument } from '../types/models';
import removeImageFromDisk from './remove-image-from-disk';

export default async function removeAllImagesFromApplication(application: ApplicationDocument): Promise<void> {
  const images = await Image.find({ application: application._id });
  if (images.length === 0)
    return;

  for (const image of images)
    await removeImageFromDisk(image); // eslint-disable-line no-await-in-loop

  await Image.deleteMany({ application: application._id });
}
