import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true},
});

export const UserModel = model<IUser>('User', UserSchema);
