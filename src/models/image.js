import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { nanoid } from 'nanoid';

const ImageSchema = new Schema({
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
  id: {
    type: String,
    trim: true,
    unique: true,
    default: nanoid(10),
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
    autopopulate: true,
  },
}, { versionKey: false });

ImageSchema.plugin(autopopulate);

ImageSchema.methods.toData = function () {
  const doc = this.toObject();

  doc.application = this.application.id;
  delete doc._id;
  return doc;
};

export default model('Image', ImageSchema);
