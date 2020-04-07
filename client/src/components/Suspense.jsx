/* @flow strict */

import * as React from 'react';
import {
  MetaContext,
  type MetaContextType,
  BROWSER
} from './../Entry.jsx';

type PropsType = {
  children: React.Node
};

const Suspense = ({ children, ...props }: PropsType): React.Element<typeof MetaContext.Consumer> => (
  <MetaContext.Consumer>
    {({ renderer }: MetaContextType): React.Element<typeof MetaContext.Consumer> => renderer === BROWSER ? (
      <React.Suspense {...props}>
        {children}
      </React.Suspense>
    ) : null}
  </MetaContext.Consumer>
);

export default Suspense;
