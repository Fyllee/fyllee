import fs from 'fs';
import path from 'path';
import { Router } from 'express';

const router = new Router();

const loadRoutes = (dirname, pathname = '') => {
  fs.readdir(path.join(dirname, pathname), (err, files) => {
    if (err) throw err;

    for (const file of files) {
      const filePath = path.join(dirname, pathname, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) loadRoutes(dirname, file);
      else if (path.parse(file).ext === '.js') {
        const { name } = path.parse(file);
        const route = path.join(pathname, name === 'index' ? '' : name);
        const Module = require(filePath).default; // eslint-disable-line

        router.use(`/${route}`, Module);
      }
    }
  });

  return router;
};

export default loadRoutes;
