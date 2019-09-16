import MainWithApollo, { PureMain } from '.';
import { addDecorator, storiesOf } from '@storybook/react';

import React from 'react';
import { SERVICE_LIST } from './mock';
import { action } from '@storybook/addon-actions';

export const PureMainStory = () => (
  <PureMain
    serviceList={SERVICE_LIST}
    onAddServiceClick={action('onAddService')}
    onDeleteServiceClick={action('onDeleteService')}
    onServiceClick={action('onService')}
    onUpdateServiceClick={action('onUpdate')}
  />
);

storiesOf('Main', module)
  .add('pure', () => <PureMainStory />)
  .add('iphonex', () => <PureMainStory />, {
    viewport: { defaultViewport: 'iphonex' },
  })
  .add('with apollo', () => (
    <MainWithApollo onServiceClick={action('onService')} />
  ));
