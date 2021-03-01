import { model, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { nanoid } from 'nanoid';
import type { ApplicationDocument, ApplicationModel, SafeApplicationDocument } from '@/app/types/models';
import generateToken from '../helpers/generate-token';

const ApplicationSchema = new Schema<ApplicationDocument>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  applicationId: {
    type: String,
    trim: true,
    unique: true,
    default: (): string => nanoid(10),
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  website: {
    type: String,
    trim: true,
    default: '',
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  token: {
    type: String,
    default(this: ApplicationDocument): string {
      return generateToken(this.applicationId);
    },
  },
}, { versionKey: false });

ApplicationSchema.plugin(autopopulate);

ApplicationSchema.methods.toData = function (): SafeApplicationDocument {
  const doc = this.toObject();

  doc.owner = this.owner.userId;
  delete doc._id;
  delete doc.token;
  return doc;
};

export default model<ApplicationDocument, ApplicationModel>('Application', ApplicationSchema);
