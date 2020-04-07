/* @flow strict */

import * as React from 'react';
import { GET, POST, PUT, DELETE } from './../../api';
import Navigation from './../../components/Navigation.jsx';
import Title from './../../components/Title.jsx';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  type RecordType,
  type ListType
} from './types.js';
import Suspense from './../../components/Suspense.jsx';

const Single = React.lazy((): React.ComponentType<{}> => import('./Single'));

type PropsType = {
  match: {
    params: {
      id: ?string
    }
  },
  history: {
    push: ({ pathname: string }) => void
  }
};
type StateType = {
  list: ListType,
  isNew: boolean
};

class ToDo extends React.Component<PropsType, StateType> {
  state = {
    list: [],
    isNew: false
  };

  componentDidMount = async () => {
    console.log(this.props);
    try {
      const list = await GET('/to-do');

      this.setState({ list });
    } catch (error) {
      console.error('Error', error);
    }
  };

  handleNew = () => {
    this.setState({ isNew: true });
  };

  handleClose = () => {
    this.props.history.push({ pathname: '/to-do' });
    this.setState({ isNew: false });
  };

  handleRemove = async (record: RecordType) => {
    try {
      const { list } = await DELETE(`/to-do/${record.id}`);

      this.setState({ list });
    } catch (error) {}
  };

  handleCreate = async (record: RecordType) => {
    try {
      const { id, list } = await POST('/to-do', record);

      this.props.history.push({ pathname: `/to-do/${id}` });
      this.setState({ list, isNew: false });
    } catch (error) {}
  };

  handleUpdate = async (record: RecordType) => {
    try {
      const { list } = await PUT(`/to-do/${record.id}`, record);

      this.setState({ list });
    } catch (error) {}
  };

  render = (): React.Element<typeof React.Fragment> => (
    <React.Fragment>
      <Navigation />
      <Title>ToDo list</Title>
      <button onClick={this.handleNew}>New</button>
      <section>
        <article>
          {_.map(this.state.list, ({ id, name }: RecordType, index: number): React.Element<'a'> => (
            <h3 key={`${index}-to-do-record`}>
              <Link to={{ pathname: `/to-do/${id}` }}>{name}</Link>
            </h3>
          ))}
        </article>
      </section>
      <Suspense fallback="">
        {_.size(this.state.list) > 0 ? (
          <Single
            record={_.find(this.state.list, ({ id }: RecordType): boolean => +id === +this.props.match.params.id)}
            onClose={this.handleClose}
            onRemove={this.handleRemove}
            onUpdate={this.handleUpdate}
          />
        ) : null}
        {this.state.isNew ? (
          <Single
            record={{ id: null, name: '' }}
            onClose={this.handleClose}
            onCreate={this.handleCreate}
          />
        ) : null}
      </Suspense>
    </React.Fragment>
  );
}

export default withRouter(ToDo);
