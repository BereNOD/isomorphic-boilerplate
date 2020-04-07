/* @flow strict */

import * as React from 'react';
import { withRouter } from 'react-router';
import Modal from './../../../components/Modal';
import Title from './../../../components/Title.jsx';

import './Single.scss';

import {
  type RecordType
} from './../types.js';

type PropsType = {
  record: ?RecordType,
  match: {
    params: {
      id: ?string
    }
  },
  onClose: () => void,
  onRemove?: (RecordType) => void,
  onUpdate?: (RecordType) => void,
  onCreate?: (RecordType) => void
};

class SingleRecord extends React.Component<PropsType> {
  state = {
    name: ''
  };

  componentDidMount() {
    this.setState({ name: _.get(this.props, 'record.name', '') });
  }

  componentDidUpdate = (prevProps: PropsType) => {
    if (!_.isEqual(prevProps.record, this.props.record)) {
      this.setState({ name: _.get(this.props, 'record.name', '') });
    }
  };

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  handleRemove = () => {
    if (this.props.onRemove) {
      this.props.onRemove({ ...this.props.record, ...this.state });
    } else {
      console.error(new Error('Undefined remove handler.'));
    }
  };
  handleUpdate = () => {
    if (this.props.onUpdate) {
      this.props.onUpdate({ ...this.props.record, ...this.state });
    } else {
      console.error(new Error('Undefined update handler.'));
    }
  };
  handleCreate = () => {
    if (this.props.onCreate) {
      this.props.onCreate({ ...this.props.record, ...this.state });
    } else {
      console.error(new Error('Undefined create handler.'));
    }
  };

  render = (): React.Element<'div'> => {
    const {
      record,
      onClose: handleClose
    } = this.props;

    return (
      <Modal
        opened={Boolean(record)}
        onClose={handleClose}
      >
        {record ? (
          <React.Fragment>
            <header className="SingleHeader">
              <Title>{_.isFinite(record.id) ? 'Edit record' : 'Create record'}</Title>
            </header>
            <div className="SingleBody">
              <input
                type="text"
                className="SingleBody__input"
                value={this.state.name}
                onChange={this.handleChange}
              />
              {_.isFinite(record.id) ? (
                <button
                  className="SingleBody__button SingleBody__button--remove"
                  onClick={this.handleRemove}
                >
                  Remove
                </button>
              ) : null}
            </div>
            <footer className="SingleFooter">
              <button
                className="SingleFooter__button SingleFooter__button--close"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="SingleFooter__button SingleFooter__button--save"
                onClick={_.isFinite(record.id) ? this.handleUpdate : this.handleCreate}
              >
                {_.isFinite(record.id) ? 'Save' : 'Create'}
              </button>
            </footer>
          </React.Fragment>
        ) : null}
      </Modal>
    );
  };
}

export default withRouter(SingleRecord);
