/* @flow strict */

import * as React from 'react';
import Home from './pages/Home';
import About from './pages/About';

export type RouteType = {
  Component: React.ComponentType<{}>,
  params: {
    exact?: boolean,
    path: string
  }
};

export type RoutesType = Array<RouteType>;

const routes: RoutesType = [
  { Component: Home, params: { exact: true, path: '/' } },
  { Component: About, params: { path: '/about' } }
];

export default routes;
