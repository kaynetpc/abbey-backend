import { Request, Response } from 'express';
import express from 'express';

const AppController = express.Router();

AppController.use("/", (req: Request, res: Response) => {
  res.json({ message: 'Abbey User Data' });
});


export default AppController;