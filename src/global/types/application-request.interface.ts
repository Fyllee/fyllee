import type { Request } from 'express';
import type { Application } from '../../applications/application.entity';

export interface ApplicationRequest extends Request {
  application: Application;
}
