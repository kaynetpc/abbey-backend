import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  accessToken?: string;
  firstName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true},
  accessToken: { type: String, required: false },
});

export const UserModel = model<IUser>('User', UserSchema);
