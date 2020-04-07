/* @flow strict */

import * as React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {};

const Navigation = ({}: PropsType): React.Element<'nav'> => (
  <nav className="Navigation">
    <Link to={{ pathname: '/' }}>Home</Link>
    <Link to={{ pathname: '/about' }}>About</Link>
    <Link to={{ pathname: '/to-do' }}>To Do</Link>
  </nav>
);

export default Navigation;
