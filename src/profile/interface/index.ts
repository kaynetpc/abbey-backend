import { IResponse } from "../../response/IResponse";

export interface IProfileResponse extends IResponse<any> {}

export type IFriend = {
  id: string;
  firstName: string;
};

export interface UserProfileRes {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  followers: IFriend[];
  following: IFriend[];
  friends: IFriend[];
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    totalFriends: number;
  };
}

export type IProfileUpdateReq = {
  firstName: string;
  lastName: string;
  gender: string;
};
