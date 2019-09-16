import SignOut, { PureSignOut } from '.';

import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

storiesOf('SignOut', module)
  .add('default', () => <PureSignOut show={true} onClick={action('clicked')} />)
  .add('WithApollo', () => (
    <>
      <SignOut />
      <div>SignOut Button might not be shown if signed out</div>
    </>
  ));
