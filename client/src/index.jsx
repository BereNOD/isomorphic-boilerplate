/* @flow strict */

import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Entry, { BROWSER } from './Entry';
import 'normalize.css';
import 'reset-css';
import 'react-toastify/scss/main.scss';
import './styles.scss';


const root = document.getElementById('root');

hydrate(
  <Router>
    <Entry renderer={BROWSER} />
  </Router>,
  root
);
