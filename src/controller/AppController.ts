import { Request, Response } from 'express';
import express from 'express';
import AuthController from '../auth/controller/AuthController';

const AppController = express.Router();

// auth controller
AppController.use("/auth", AuthController);


export default AppController;