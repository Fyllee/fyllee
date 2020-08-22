/* eslint-disable no-await-in-loop */
import { promises as fs } from 'fs';
import path from 'path';
import { Router } from 'express';

const router = new Router();

const loadRoutes = async (dirname, pathname = '') => {
  const files = await fs.readdir(path.join(dirname, pathname)).catch((err) => { throw err; });
  for (const file of files) {
    const filePath = path.join(dirname, pathname, file);
    const isDirectory = (await fs.stat(filePath)).isDirectory();

    if (isDirectory) await loadRoutes(dirname, file);
    else if (path.parse(file).ext === '.js') {
      const { name } = path.parse(file);
      const route = path.join(pathname, name === 'index' ? '' : name);
      const Module = require(filePath).default;

      router.use(`/${route}`, Module);
    }
  }

  return router;
};

export default loadRoutes;
