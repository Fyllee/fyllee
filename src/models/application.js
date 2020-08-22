import { Schema, model } from 'mongoose';

const ApplicationSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  website: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // Missing the fields id
});

export default model('Application', ApplicationSchema);
