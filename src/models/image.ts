import { model, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { nanoid } from 'nanoid';
import type { ImageDocument, ImageModel, SafeImageDocument } from '@/app/types/models';

const ImageSchema = new Schema<ImageDocument, ImageModel>({
  originalName: {
    type: String,
    trim: true,
    required: true,
  },
  savedName: {
    type: String,
    trim: true,
    required: true,
  },
  imageId: {
    type: String,
    trim: true,
    unique: true,
    default: (): string => nanoid(10),
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
    autopopulate: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

ImageSchema.plugin(autopopulate);

ImageSchema.methods.toData = function (): SafeImageDocument {
  const doc = this.toObject();

  doc.application = this.application.applicationId;
  delete doc._id;
  delete doc.updatedAt;
  delete doc.createdAt;
  return doc;
};

export default model<ImageDocument, ImageModel>('Image', ImageSchema);