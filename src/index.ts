// import http from 'http';
import App from './app';
import { AppConfigs } from './config/app';
import { connectDB }  from './config/database';

const {PORT, SERVER_PATH} = AppConfigs

App.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is now running on port ${PORT} at ${SERVER_PATH}`);
});
