/* @flow strict */

import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ToastContainer } from 'react-toastify';
import _ from 'lodash';

import routes, {
  type RouteType
} from './routes';

type PropsType = {
  renderer: string
};

export const SERVER = 'server';
export const BROWSER = 'browser';
export type MetaContextType = {
  renderer: typeof SERVER | typeof BROWSER
};
export const defaultMetaContext: MetaContextType = {
  renderer: SERVER
};
export const MetaContext = React.createContext<MetaContextType>(defaultMetaContext);

const Entry = ({
  renderer,
  ...props
}: PropsType): React.Element<typeof Switch> => (
  <MetaContext.Provider
    value={{
      renderer
    }}
  >
    <Switch>
      {_.map(routes, ({ Component, params = {} }: RouteType, index: number): React.Element<typeof Route> => (
        <Route {...params} key={`Route-number-${index}`}>
          <Component {...props} />
        </Route>
      ))}
    </Switch>
    <ToastContainer />
  </MetaContext.Provider>
);

export default hot(Entry);
