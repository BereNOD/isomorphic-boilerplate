/* @flow strict */

import * as React from 'react';
import { renderToStaticNodeStream } from 'react-dom/server';
import RenderModel from '/Modules/Render/Model/RenderModel';
import ThemeModel from '/Modules/Themes/Model/ThemeModel';

class RenderController {
  static render = async ({ baseUrl }: $Request, res: $Response) => {
    res
      .write('<!DOCTYPE html>');

    const theme = await ThemeModel.getThemeByFileName();

    renderToStaticNodeStream(<RenderModel.View url={baseUrl} theme={theme} />)
      .pipe(res);
  };
}

export default RenderController;
