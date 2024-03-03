import { Request, Response } from 'express';
import express from 'express';
import AuthController from '../auth/controller/AuthController';
import ProfileController from '../profile/controller/ProfileController';
import UserController from '../user/controller/UserController';

const AppController = express.Router();

// auth controller
AppController.use("/auth", AuthController);

// profile controller
AppController.use("/profile", ProfileController);

AppController.use("/users", UserController);


export default AppController;