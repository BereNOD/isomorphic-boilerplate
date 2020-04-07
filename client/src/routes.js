/* @flow strict */

import * as React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import ToDo from './pages/ToDo';

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
  { Component: About, params: { path: '/about' } },
  { Component: ToDo, params: { path: '/to-do/:id?' } }
];

export default routes;
