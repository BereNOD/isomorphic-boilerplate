/* @flow strict */

import * as React from 'react';

type PropsType = {
  children: string
};

const Title = ({
  children
}: PropsType): React.Element<'h1'> => (
  <h1>{children}</h1>
);

export default Title;
