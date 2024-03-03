import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import AppController from './controller/AppController';

const App = express();

App.use(express.json());
App.use(express.text());
App.use(express.raw());

App.use(bodyParser.json());
App.use(cookieParser());
App.use(cors());
App.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

App.use('/api', AppController);

export default App;