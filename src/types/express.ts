import type {
  ApplicationDocument,
  ApplicationModel,
  ContentModel,
  UserDocument,
  UserModel,
} from './models';

declare module 'express' {
  interface Response {
    success: (message: string, statusCode?: number, objects?: Record<string, unknown>) => void;
    error: (message: string, statusCode: number, error?: Error | Record<string, unknown>) => void;
  }

  interface Request {
    requiredParameters: (model: ApplicationModel | ContentModel | UserModel, exclude?: string[] | string) => boolean;
    application?: ApplicationDocument;

    user?: UserDocument;
  }
}
