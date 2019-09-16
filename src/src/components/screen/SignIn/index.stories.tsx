import SignIn, { PureSignIn } from '.';

import React from 'react';
import SignOut from '../../ui/SignOut';
import { WithSignInApollo } from './WithApollo';
import { storiesOf } from '@storybook/react';

storiesOf('SignIn', module)
  .add('pure', () => (
    <PureSignIn
      onSubmitSuccess={() => {
        console.log('Success');
      }}
    />
  ))
  .add('With Apollo', () => (
    <>
      <SignOut />
      <SignIn />
    </>
  ));
