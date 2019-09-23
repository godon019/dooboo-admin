import { FrameDecorator } from '../../../../.storybook/decorators';
import React from 'react';
import { SERVICE_DETAIL } from './mock';
import ServiceDetail from '.';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const Story = () => (
  <ServiceDetail
    serviceDetail={SERVICE_DETAIL}
    onDeleteSubsClick={action('onDeleteSubs')}
  />
);

storiesOf('ServiceDetail', module)
  .addDecorator(FrameDecorator)
  .add('pure', () => <Story />)
  .add('iphonex', () => <Story />, {
    viewport: { defaultViewport: 'iphonex' },
  });
