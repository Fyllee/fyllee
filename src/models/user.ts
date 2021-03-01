import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import type { SafeUserDocument, UserDocument, UserModel } from '@/app/types/models';
import generateToken from '../helpers/generate-token';


const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: String,
    trim: true,
    unique: true,
    default: (): string => nanoid(10),
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
  token: {
    type: String,
    default(this: UserDocument): string {
      return generateToken(this.userId);
    },
  },
}, { versionKey: false });

UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.toData = function (): SafeUserDocument {
  const doc = this.toObject();

  delete doc._id;
  delete doc.password;
  delete doc.token;
  return doc;
};

UserSchema.pre('save', async function (this: UserDocument) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
});

export default model<UserDocument, UserModel>('User', UserSchema);
