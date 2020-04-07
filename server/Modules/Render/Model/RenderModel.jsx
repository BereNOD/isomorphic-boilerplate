/* @flow strict */

import * as React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import Entry, { SERVER } from '/client/src/Entry.jsx';
import { version } from '/client/package.json';

class RenderModel {
  static View = ({ url }: { url: string }): React.Element<'html'> => (
    <html>
      <head>
        <title>Empty project</title>
        <meta charSet="utf-8" />
        {process.env.NODE_ENV !== 'development' ? (
          <link rel="stylesheet" href={`/main.css?version=${version}`}/>
        ) : null}
        <base href="/"/>
      </head>
      <body>
        <div id="root">
          <Router location={url} context={{}}>
            <Entry renderer={SERVER} />
          </Router>
        </div>
        <script src={`/runtime.js?version=${version}`} />
        <script src={`/vendors.js?version=${version}`} />
        <script src={`/main.js?version=${version}`} />
      </body>
    </html>
  );
}

export default RenderModel;
