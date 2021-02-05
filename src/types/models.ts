import type {
 Document,
 LeanDocument,
 Model,
 Types,
} from 'mongoose';

/* **************************** */
/*      User Database Types     */
/* **************************** */

/** Interface for the "User"'s mongoose schema */
export interface UserBase {
  name: string;
  userId: string;
  email: string;
  password: string;
}

/** Interface for the "User"'s mongoose document */
export interface UserDocument extends UserBase, Document {
  isValidPassword(password: string): Promise<boolean>;
  toData(): SafeUserDocument;
  toJWT(): { _id: string };
}

/** Interface for the "User"'s mongoose document, without sensitive informations */
export type SafeUserDocument = Omit<LeanDocument<UserDocument>, '_id' | 'password'>;

/** Interface for the "User"'s mongoose model */
export type UserModel = Model<UserDocument>;

/* **************************** */
/*  Application Database Types  */
/* **************************** */

/** Interface for the "Application"'s mongoose schema */
export interface ApplicationBase {
  name: string;
  applicationId: string;
  website: string;
  description: string;
  owner: Types.ObjectId | UserDocument;
}

/** Interface for the "Application"'s mongoose document, when the user field is not populated */
export interface ApplicationDocument extends ApplicationBase, Document {
  owner: UserDocument['_id'];
  toData(): SafeApplicationDocument;
  toJWT(): { _id: string };
}

export type SafeApplicationDocument = Omit<LeanDocument<ApplicationDocument & { owner: string }>, '_id'>;

/** Interface for the "Application"'s mongoose document, when the user field is populated */
export interface ApplicationPopulatedDocument extends ImageDocument {
  owner: UserDocument;
}

/** Interface for the "Application"'s mongoose model */
export type ApplicationModel = Model<ApplicationDocument>;

/* **************************** */
/*     Image Database Types     */
/* **************************** */

/** Interface for the "Image"'s mongoose schema */
export interface ImageBase {
  originalName: string;
  savedName: string;
  imageId: string;
  application: ApplicationDocument | Types.ObjectId;
}

/** Interface for the "Image"'s mongoose document, when the application field is not populated */
export interface ImageDocument extends ImageBase, Document {
  application: ApplicationDocument['_id'];
  toData(): SafeImageDocument;
}

export type SafeImageDocument = Omit<LeanDocument<ImageDocument & { application: string }>, '_id'>;

/** Interface for the "Image"'s mongoose document, when the application field is populated */
export interface ImagePopulatedDocument extends ImageDocument {
  application: ApplicationDocument;
}

/** Interface for the "Image"'s mongoose model */
export type ImageModel = Model<ImageDocument>;
