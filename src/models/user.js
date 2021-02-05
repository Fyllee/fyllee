import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';


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
    default: () => nanoid(10),
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
}, { versionKey: false });

UserSchema.methods.isValidPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.toData = function () {
  const doc = this.toObject();

  delete doc._id;
  delete doc.password;
  return doc;
};

UserSchema.methods.toJWT = function () {
  const doc = this.toObject();
  return { _id: doc._id };
};

UserSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
});

export default model('User', UserSchema);
