import { model, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { nanoid } from 'nanoid';
import type { ContentDocument, ContentModel, SafeContentDocument } from '@/app/types/models';

const ContentSchema = new Schema<ContentDocument, ContentModel>({
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
  contentId: {
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

ContentSchema.plugin(autopopulate);

ContentSchema.methods.toData = function (): SafeContentDocument {
  const doc = this.toObject();

  doc.application = this.application.applicationId;
  delete doc._id;
  delete doc.updatedAt;
  delete doc.createdAt;
  return doc;
};

export default model<ContentDocument, ContentModel>('Content', ContentSchema);
