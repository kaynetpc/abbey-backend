import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserResponse } from '../interface/index';
import { AppConfigs } from '../../config/app';
import { UserModel } from '../models/User';

export class AuthService {
  // Register user
  static async register(userInfo: { email: string; password: string, firstName?: string }): Promise<IUserResponse> {
    try {
      const { email, password, firstName } = userInfo;

      const isExist = await UserModel.findOne({ email });

      // user already exist
      if(isExist) {
        return {message: "User already exist", hasError: true, statusCode: 400, data: null};
      }
      const hashedPassword = await hash(password);

      const user = new UserModel({
        email,
        password: hashedPassword,
        firstName
      });


      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
        tokenType: "access",
      };

      const accessToken = generateAccessToken(payload);

      return {message: "Account has been created", hasError: false, statusCode: 201, data: {accessToken, email, firstName}};
    } catch (error: any) {
      console.error(error?.message);
      return {message: error.message, statusCode: 500, hasError: true, data: error};
    }
  }

  static async login (user: {email: string, password: string}): Promise<IUserResponse> {

    try {
      // check if user exist
      const isExist = await UserModel.findOne({ email: user.email });
  
      // user already exist
      if(!isExist) {
        return {message: "Email or password is incorrect!", hasError: true, statusCode: 401};
      }
      
      /// confirm password
      const isValidPassword = await compare(user.password, isExist.password);
      // save new user
      if(!isValidPassword) {
          return {statusCode: 404, data: null, hasError: false, message: 'Email or password is incorrect!'}
      }

      const payload = {
        user: {
          id: isExist.id,
        },
        tokenType: "access",
      };

      const accessToken = generateAccessToken(payload)
      
      await isExist.save();
      // return access token and refreshToken
      return {statusCode: 200, data: {accessToken, firstName: isExist.firstName}, hasError: false, message: 'Success!'}
      
    } catch (error: any) {
      return {message: error.message, statusCode: 500, hasError: false, data: error};
    }
  }

}

export const generateAccessToken = (tokenData: any) => {
  return jwt.sign(tokenData, AppConfigs.JWT_SECRET, {
    expiresIn: AppConfigs.ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

export const hash = async (data: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
};
