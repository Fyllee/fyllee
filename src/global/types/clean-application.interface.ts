import type { Application } from '../../applications/application.entity';

export type CleanApplication = Omit<Application, 'createdAt' | 'token' | 'updatedAt'>;
