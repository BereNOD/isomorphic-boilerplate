/* @flow strict */

import Log from '/utils/Log';

import Express from 'express';
import Path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Morgan from 'morgan';
import './Mongo';

const AssetsFolder = Path.join(__dirname, '..', '..', 'client', 'dist');

const Middleware = (App: Express) => {
  App.use(cors());
  App.use(Morgan('dev'));
  App.use(Express.json());
  App.use(Express.urlencoded({
    extended: false
  }));
  App.use(cookieParser());
  App.use(Express.static(AssetsFolder));

  Log('Middleware was bind.');
};

export default Middleware;
