import { LoadingOverlay } from './Loading';
import React from 'react';
import { storiesOf } from '@storybook/react';

const loadingIndexString = `CategoryModal Update Mutation`;
const fetchingStatusObj = {
  [loadingIndexString]: true,
  WhatIsIt: false,
};
class FetchingControl extends React.Component {
  state = {
    show: true,
  };
  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <button onClick={this.handleClick}>toggle Overlay</button>
        <LoadingOverlay
          show={this.state.show}
          fetchingStatusObj={fetchingStatusObj}
        />
      </div>
    );
  }
}

storiesOf('Fetching Overlay', module).add('default', () => <FetchingControl />);
