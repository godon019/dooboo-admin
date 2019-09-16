import { addDecorator, storiesOf } from '@storybook/react';

import { Frame } from './Frame';
import { PureMainStory } from '../../screen/Main/index.stories';
import { PureSignIn } from '../../screen/SignIn';
import React from 'react';

storiesOf('Frame', module)
  .add('default', () => <Frame />)
  .add('SignIn', () => (
    <Frame>
      <PureSignIn />
    </Frame>
  ))
  .add('Main', () => (
    <Frame>
      <PureMainStory />
    </Frame>
  ));
