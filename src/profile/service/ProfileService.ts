import { UserModel } from "./../../auth/models/User";
import {
  IProfileResponse,
  IProfileUpdateReq,
  UserProfileRes,
} from "../interface/index";
import { AppConfigs } from "../../config/app";
import { ProfileModel } from "../model/Profile";
import { ProfileResDto } from '../dto/profile.dto';

export class ProfileService {
  // get user profile
  static async getUserProfile(userId: string): Promise<IProfileResponse> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return { message: "User not found", hasError: true,  statusCode: 404,  data: null };
      }

      // get user profile if exist
      const profile = await ProfileModel.findOne({ userId });

      // if has no profile create one
      if (!profile) {
        const newProfile = new ProfileModel({
          userId: userId,
          firstName: user.firstName,
          followers: [],
          following: [],
          friends: [],
          gender: "",
          lastName: "",
        });
        await newProfile.save();
        return { message: "User profile",  hasError: false,  statusCode: 200,   data: new ProfileResDto(newProfile, user.email)};
      }

      const payload: UserProfileRes = new ProfileResDto(profile, user.email);
      
      return {  message: "User profile",  hasError: false, statusCode: 200, data: payload };

    } catch (error: any) {
      AppConfigs.IS_DEV && console.error(error?.message);
      return {
        message: error.message,
        statusCode: 500,
        hasError: true,
        data: error,
      };
    }
  }

  // update user profile
  static async updateProfile(
    userId: string,
    profileInfo: IProfileUpdateReq
  ): Promise<IProfileResponse> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return {
          message: "User not found", hasError: true, statusCode: 404, data: null  };
      }
      // get user profile
      const profile = await ProfileModel.findOne({ userId });
      if (!profile) {
        const newProfile = new ProfileModel({
          userId: userId,
          firstName: user.firstName,
          followers: [],
          following: [],
          friends: [],
          gender: profileInfo?.gender || "",
          lastName: profileInfo?.lastName || "",
        });
        await newProfile.save();
        return { message: "User profile", hasError: false, statusCode: 200, data: new ProfileResDto(newProfile, user.email)};
      }

      // update user profile
      profile.firstName = profileInfo.firstName || profile.firstName;
      profile.lastName = profileInfo.lastName || profile.lastName;
      profile.gender = profileInfo.gender || profile.gender;
      user.firstName = profileInfo.firstName || user.firstName;
      await user.save();
      await profile.save();
      return {
        message: "User profile", hasError: false, statusCode: 200, data: new ProfileResDto(profile, user.email)};
    } catch (error: any) {
      AppConfigs.IS_DEV && console.error(error?.message);
      return {
        message: error.message,
        statusCode: 500,
        hasError: true,
        data: null,
      };
    }
  }

  // follow a user by the userId
  static async followUser(
    userId: string,
    followerId: string
  ): Promise<IProfileResponse> {
    try {
      // get user profile
      const profile = await ProfileModel.findOne({ userId });
      if (!profile) {
        return {
          message: "User not found",
          hasError: true,
          statusCode: 404,
          data: null,
        };
      }
      // followerId is not thesame as userId
      if (userId === followerId) {
        return { message: "You cannot follow yourself",  hasError: true,  statusCode: 400, data: null};
      }
      // get follower profile
      const followingProfile = await ProfileModel.findById(followerId);
      if (!followingProfile) {
        return {
          message: "Follower not found",
          hasError: true,
          statusCode: 404,
          data: null,
        };
      }
      // check if user already follower
      const isFollowing = profile.following.find(
        (follower) => follower.id === followerId
      );
      if (isFollowing) {
        return {
          message: "You already follow this user",
          hasError: true,
          statusCode: 400,
          data: null,
        };
      }
      // add follower to profile
      const newFollowing = {
        id: followerId,
        firstName: followingProfile.firstName,
      };
      profile.following.push(newFollowing);
      await profile.save();

      return {
        message: `You are now following ${followingProfile.firstName}`,
        hasError: false,
        statusCode: 200,
        data: null,
      };
    } catch (error: any) {
      AppConfigs.IS_DEV && console.error(error?.message);
      return {
        message: error.message,
        statusCode: 500,
        hasError: true,
        data: null,
      };
    }
  }
  // unfollow a user by the userId
  static async unfollowUser(
    userId: string,
    followerId: string
  ): Promise<IProfileResponse> {
    try {
      // get user profile
      const profile = await ProfileModel.findOne({ userId });
      if (!profile) {
        return {
          message: "User not found",
          hasError: true,
          statusCode: 404,
          data: null,
        };
      }
      // get follower profile
      const followerProfile = await ProfileModel.findById(followerId);
      if (!followerProfile) {
        return {
          message: "Follower not found",
          hasError: true,
          statusCode: 404,
          data: null,
        };
      }
      // check if user already follower
      const isFollower = profile.following.find(
        (follower) => follower.id === followerId
      );
      if (!isFollower) {
        return {
          message: "You are not following this user",
          hasError: true,
          statusCode: 400,
          data: null,
        };
      }
      // remove follower from profile
      profile.following = profile.following.filter(
        (follower) => follower.id !== followerId
      );
      await profile.save();
      return {
        message: `Successfully unfollow ${followerProfile.firstName}`,
        hasError: false,
        statusCode: 200,
        data: null,
      };
    } catch (error: any) {
      AppConfigs.IS_DEV && console.error(error?.message);
      return {
        message: error.message,
        statusCode: 500,
        hasError: true,
        data: null,
      };
    }
  }

  static async addUserToFriends(
    userId: string,
    friendId: string
  ): Promise<IProfileResponse> {
    try {
      // get user profile
      const profile = await ProfileModel.findOne({ userId });
      if (!profile) {
        return {
          message: "User not found",
          hasError: true,
          statusCode: 404,
          data: null,
        };
      }
      // get follower profile
      const friendProfile = await ProfileModel.findById(friendId);
      if (!friendProfile) {
        return {
          message: "Profile not found",
          hasError: true,
          statusCode: 404,
          data: null,
        };
      }
      // check if user already follower
      const isFriend = profile.friends.find((friend) => friend.id === friendId);
      if (isFriend) {
        return {
          message: "You already friend this user",
          hasError: true,
          statusCode: 400,
          data: null,
        };
      }
      // add follower to profile
      const newFriend = {
        id: friendId,
        firstName: friendProfile.firstName,
      };
      profile.friends.push(newFriend);
      await profile.save();
      return {
        message: `You are now friend with ${friendProfile.firstName}`,
        hasError: false,
        statusCode: 200,
        data: null,
      };
    } catch (error: any) {
      AppConfigs.IS_DEV && console.error(error?.message);
      return {
        message: error?.message || "Something went wrong",
        statusCode: 500,
        hasError: true,
        data: null,
      };
    }
  }

  // get list of public profile
  static async getPublicProfiles( userId: string, limit: number, offset: number): Promise<IProfileResponse> {
    try {
        const profile = await ProfileModel.findOne({ userId });
        if (!profile) {
            return {
                message: "User not found",
                hasError: true,
                statusCode: 404,
                data: null,
            };
        }

        // find offset and limit
        const publicProfiles = await ProfileModel.find()
        .limit(limit)
        .skip(offset)
        .exec();

        return {
            message: "Success",
            hasError: false,
            statusCode: 200,
            data: publicProfiles.map(x => new ProfileResDto(x, "")),
        };
    } catch (error: any) {
        AppConfigs.IS_DEV && console.error(error?.message);
        return {
            message: error.message,
            statusCode: 500,
            hasError: true,
            data: null,
        };
    }
  }
}
