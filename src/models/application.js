import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
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
}, { versionKey: false });

ApplicationSchema.plugin(autopopulate);

ApplicationSchema.methods.toData = function () {
  const doc = this.toObject();

  delete doc._id;
  return doc;
};

export default model('Application', ApplicationSchema);
