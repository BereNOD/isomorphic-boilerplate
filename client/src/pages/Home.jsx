/* @flow strict */

import * as React from 'react';
import Suspense from './../components/Suspense.jsx';
import Navigation from './../components/Navigation.jsx';

const Title = React.lazy((): React.ComponentType<{}> => import('./../components/Title.jsx'));

type PropsType = {};

const Home = ({}: PropsType): React.Element<typeof React.Fragment> => (
  <React.Fragment>
    <Navigation />
    <Suspense fallback="Loading...">
      <Title>Home</Title>
    </Suspense>
  </React.Fragment>
);

export default Home;
