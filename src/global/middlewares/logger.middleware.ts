import { Logger } from '@nestjs/common';
import morgan from 'morgan';

morgan.token('status-colored', (_req, { statusCode }) => {
  const color = statusCode >= 500 ? 31 // Red
    : statusCode >= 400 ? 33 // Yellow
    : statusCode >= 300 ? 34 // Blue
    : statusCode >= 200 ? 36 // Cyan
    : 37; // White
  return `\u001B[${color}m${statusCode}\u001B[0m`;
});

const getMorganLine = morgan.compile(':method :url :response-time ms — :status-colored');
const routeLogger = new Logger('Endpoint');

export const logger = morgan((tokens, req, res) => {
  const line = getMorganLine(tokens, req, res);
  routeLogger.log(`Request finished: ${line}`);
  return null;
});
