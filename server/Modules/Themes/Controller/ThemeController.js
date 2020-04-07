/* @flow strict */

import ThemeModel from '/Modules/Themes/Model/ThemeModel';
import CSS from 'json-to-css';

class ThemeController {
  static theme = async (req: $Request, res: $Response) => {
    const { properties } = await ThemeModel.getThemeByFileName();

    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(CSS.of({ ':root': properties }));
    res.end();
  };
}

export default ThemeController;
