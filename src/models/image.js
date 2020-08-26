import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const ImageSchema = new Schema({
  name: {
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
  },
}, { versionKey: false });

ImageSchema.methods.toData = function () {
  const doc = this.toObject();

  delete doc._id;
  delete doc.application;
  return doc;
};

export default model('Image', ImageSchema);
