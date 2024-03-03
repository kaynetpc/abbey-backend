import express from 'express';
import { ResponseService } from '../../response/responseService';
import { ProfileService } from '../../profile/service/ProfileService';

// get list of users
const UserController = express.Router();

// get list of users
UserController.get('/', async (req, res) => {
    const userId = req.app.locals?.userID;
    const limit = req.query?.limit ? parseInt(req.query?.limit as string) : 10;
    const offset = req.query?.offset ? parseInt(req.query?.offset as string) : 0;
    const { data, message, statusCode, hasError } = await ProfileService.getPublicProfiles(userId, limit, offset);
    ResponseService.send({ data, message, response: res, statusCode, hasError });
    return;
})

export default UserController;