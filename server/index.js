/* @flow strict */

import Express from 'express';
import HTTP from 'http';

import Log from '/utils/Log';
import normalizePort from '/utils/normalizePort';
import onError from '/utils/onError';
import onListening from '/utils/onListening';

import Middleware from '/Middleware';
import Router from '/Router';
import ErrorHandler from '/ErrorHandler';

Log('Server starting...');

export const App = Express();
const port = normalizePort(process.env.PORT);

App.set('port', port);

HTTP
  .createServer(App)
  .on('error', onError)
  .on('listening', onListening)
  .listen(port);


Middleware(App);
Router(App);
ErrorHandler(App);

Log('Server started.');

export default App;
