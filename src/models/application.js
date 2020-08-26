import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const ApplicationSchema = new Schema({
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
  owner: {
    type: String,
    trim: true,
    required: true,
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
}, { versionKey: false });

ApplicationSchema.methods.toData = function () {
  const doc = this.toObject();

  delete doc._id;
  return doc;
};

export default model('Application', ApplicationSchema);
