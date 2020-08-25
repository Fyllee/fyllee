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
    unique: true,
    // required: true,
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

UserSchema.methods.isValidPassword = async (password) => {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.getUserData = () => {
  const doc = this.toObject();

  delete doc.__v;
  delete doc._id;
  delete doc.password;
  return doc;
};

// TODO: verify fields before save
// Password hash is done
UserSchema.pre('save', async function () {
  const user = this;

  if (!user.isModified('password'))
    return;

  user.password = await bcrypt.hash(user.password, 10);
});

export default model('User', UserSchema);
