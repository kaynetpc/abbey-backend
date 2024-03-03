import { Schema, model } from 'mongoose';
import { IFriend } from '../interface/index';

export interface IProfile {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  followers: IFriend[];
  following: IFriend[];
  friends: IFriend[];
}


const ProfileSchema: Schema = new Schema<IProfile>({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: false},
  lastName: { type: String, required: false},
  gender: { type: String, required: false},
  followers: [{ type: {id: String, firstName: String}, required: false}],
  following: [{ type: {id: String, firstName: String}, required: false}],
  friends: [{ type: {id: String, firstName: String}, required: false}],
});

export const ProfileModel = model<IProfile>('Profile', ProfileSchema);
