import { IFriend } from "profile/interface";
import { IProfile } from "profile/model/Profile";

export class ProfileResDto {
  id: string;
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

  constructor(p: IProfile, email: string) {
    this.id = p._id || "";
    this.firstName = p.firstName || "";
    this.lastName = p.lastName || "";
    this.email = email || "";
    this.gender = p?.gender || "";
    this.followers =
      p?.followers.map((x) => {
        return { id: x.id, firstName: x.firstName};
      }) || [];
    this.following =
      p?.following.map((x) => {
        return { id: x.id, firstName: x.firstName};
      }) || [];
    this.friends =
      p?.friends.map((x) => {
        return { id: x.id, firstName: x.firstName};
      }) || [];
    this.stats = {
      totalFollowers: p?.followers?.length || 0,
      totalFollowing: p?.following?.length || 0,
      totalFriends: p?.friends?.length || 0,
    };
  }
}
