import mime from '@/app/config/mime-type';

export default function isImage(name: string): boolean {
  const mimeType = mime.lookup(name) as string;

  if (!mimeType)
    return false;

  if (mimeType.split('/')[0] === 'image')
    return true;

  return false;
}
