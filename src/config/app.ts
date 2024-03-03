import {getEnv} from '.';
import dotenv from "dotenv";
dotenv.config();

export const AppConfigs = {
  PORT: parseInt(getEnv('PORT', '8080')),
  SERVER_PATH: getEnv('SERVER_PATH', '/api'),
  IS_DEV: getEnv('ENVIRONMENT') === 'development',

  
  // db related local
  MONGODB_URI: getEnv('MONGODB_URI', ''),
  MONGODB_DEV_URI: getEnv('MONGODB_DEV_URI', ''),
  // keys
  JWT_SECRET: getEnv('TOKEN_KEY', "gfgvhjkl"),
  ACCESS_TOKEN_EXPIRATION_TIME: getEnv('ACCESS_TOKEN_EXPIRATION_TIME', "1d"),
};