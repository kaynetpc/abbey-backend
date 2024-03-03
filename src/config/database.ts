import { AppConfigs } from './app';
import mongoose from 'mongoose';

// Database connection options
export const connectDB = async () => {
  try {
    const DB_URL = AppConfigs.IS_DEV? AppConfigs.MONGODB_DEV_URI: AppConfigs.MONGODB_URI;
    await mongoose.connect(DB_URL);
    AppConfigs.IS_DEV && console.log('Connected to the database');
    return true;
  } catch (e) {
    AppConfigs.IS_DEV && console.log(`Failed to connected to the database`);
    AppConfigs.IS_DEV && console.error(e);
    return false;
  }
};
