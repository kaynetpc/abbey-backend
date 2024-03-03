import dotenv from 'dotenv';
dotenv.config();

export const getEnv = (name: string, defaultValue = '') => {
  return process.env[name] || defaultValue;
};

