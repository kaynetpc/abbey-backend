import express from 'express';
import { ResponseService } from '../../response/responseService';
import { ProfileService } from '../service/ProfileService';

const ProfileController = express.Router();

// Get user profile
ProfileController.get('/', async (req, res) => {
    const userId = req.app.locals?.userID
    if(!userId) {
        ResponseService.send({ data: null, message: 'Permission denied', response: res, statusCode: 401 });
        return;
    }
    const { data, message, statusCode, hasError } = await ProfileService.getUserProfile(userId);
    ResponseService.send({ data, message, response: res, statusCode, hasError });
    return;
})

// update profile
ProfileController.put('/', async (req, res) => {
    const userId = req.app.locals?.userID
    if(!userId) {
        ResponseService.send({ data: null, message: 'Permission denied', response: res, statusCode: 401 });
        return;
    }
    const { data, message, statusCode, hasError } = await ProfileService.updateProfile(userId, req.body);
    ResponseService.send({ data, message, response: res, statusCode, hasError });
    return;
})


// add as friend user
ProfileController.post('/addfriend', async (req, res) => {
    const userId = req.app.locals?.userID
    const friendId = req.query?.friendId;
    if(!userId) {
        ResponseService.send({ data: null, message: 'Permission denied', response: res, statusCode: 401 });
        return;
    }
    if(!friendId) {
        ResponseService.send({ data: null, message: 'Friend user id is required', response: res, statusCode: 400 });
        return;
    }
    const { data, message, statusCode, hasError } = await ProfileService.addUserToFriends(userId, friendId as any);
    ResponseService.send({ data, message, response: res, statusCode, hasError });
    return;
})

// follow user
ProfileController.post('/follow', async (req, res) => {
    const userId = req.app.locals?.userID
    const followingUserId = req.query?.followingUserId;
    if(!userId) {
        ResponseService.send({ data: null, message: 'Permission denied', response: res, statusCode: 401 });
        return;
    }
    if(!followingUserId) {
        ResponseService.send({ data: null, message: 'Following user id is required', response: res, statusCode: 400 });
        return;
    }
    const { data, message, statusCode, hasError } = await ProfileService.followUser(userId, followingUserId as any);
    ResponseService.send({ data, message, response: res, statusCode, hasError });
    return;
})

// unfollow user
ProfileController.post('/unfollow', async (req, res) => {
    const userId = req.app.locals?.userID
    const followingUserId = req.query?.followingUserId;
    if(!userId) {
        ResponseService.send({ data: null, message: 'Permission denied', response: res, statusCode: 401 });
        return;
    }
    if(!followingUserId) {
        ResponseService.send({ data: null, message: 'Following user id is required', response: res, statusCode: 400 });
        return;
    }
    const { data, message, statusCode, hasError } = await ProfileService.unfollowUser(userId, followingUserId as any);
    ResponseService.send({ data, message, response: res, statusCode, hasError });
    return;
})

export default ProfileController;