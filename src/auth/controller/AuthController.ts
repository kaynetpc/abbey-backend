import express from 'express';
import { ResponseService } from '../../response/responseService';
import { AuthService } from '../service/AuthService';
import { AuthRoute } from '../route/index';

const AuthController = express.Router();

// register user
AuthController.post(AuthRoute.register, async (req, res) => {
    if(!req?.body?.email ||!req?.body?.password) {
        ResponseService.send({response: res, hasError: true, statusCode: 400, data: null, message: "Email and password are required"});
        return;
    }
    const {data, hasError, message, statusCode} = await AuthService.register(req?.body);
    ResponseService.send({data, message, response: res, statusCode, hasError});
    return;
})

// Sign in / Login user
AuthController.post(AuthRoute.login, async (req, res) => {
    // check if login credentials is supplied and valid    
    if(!req?.body?.email || !req?.body?.password) {
        ResponseService.send({response: res, hasError: true, statusCode: 400, data: null, message: "Email and password are required"});
        return;                                        
    }
    const {data, hasError, message, statusCode} = await AuthService.login(req?.body);
    ResponseService.send({data, message, response: res, statusCode, hasError});
    return;
})

export default AuthController;