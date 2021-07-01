import path from 'path';
import { BadRequestException } from '@nestjs/common';
import type { Express } from 'express';
import mimeType from '../mime-type';

type FilterCallback = (error: Error | null, acceptFile: boolean) => void;

export const fileFilter = (_req: Request, file: Express.Multer.File, cb: FilterCallback): void => {
  const extension = path.extname(file.originalname).replace('.', '');
  if (mimeType.lookup(extension))
    cb(null, true);
  else
    cb(new BadRequestException('Invalid file type'), false);
};
