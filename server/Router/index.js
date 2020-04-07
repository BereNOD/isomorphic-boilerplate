/* @flow strict */

import Log from '/utils/Log';
// import skipAsyncOnly from '/Middleware/skipAsyncOnly.js';

import Render from '/Modules/Render/Router/RenderRouter';
import Theme from '/Modules/Themes/Router/ThemeRouter';

const Router = (App: Express) => {
  // App.use('/to-do', skipAsyncOnly(ToDoRouter));
  App.use('/', Render);
  App.use('/', Theme);

  Log('Router was bind.');
};

export default Router;
