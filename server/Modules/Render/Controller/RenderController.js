/* @flow strict */

import * as React from 'react';
import { renderToStaticNodeStream } from 'react-dom/server';
import RenderModel from '/Modules/Render/Model/RenderModel';

class RenderController {
  static render = ({ baseUrl }: $Request, res: $Response) => {
    res
      .write('<!DOCTYPE html>');

    renderToStaticNodeStream(<RenderModel.View url={baseUrl} />)
      .pipe(res);
  };
}

export default RenderController;
