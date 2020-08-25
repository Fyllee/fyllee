import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
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
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getUserData = function () {
  const doc = this.toObject();

  delete doc._id;
  delete doc.password;
  return doc;
};

export default model('User', UserSchema);
