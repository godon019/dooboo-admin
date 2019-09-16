import { SERVICE_DETAIL, SUBS_LIST } from './mock';
import ServiceDetail, { PureServiceDetail } from '.';

import { FrameDecorator } from '../../../../.storybook/decorators';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const Story = () => (
  <PureServiceDetail
    subsList={SUBS_LIST}
    serviceDetail={SERVICE_DETAIL}
    onDeleteSubsClick={action('onDeleteSubs')}
  />
);

storiesOf('ServiceDetail', module)
  .addDecorator(FrameDecorator)
  .add('pure', () => <Story />)
  .add('iphonex', () => <Story />, {
    viewport: { defaultViewport: 'iphonex' },
  })
  .add('with apollo', () => (
    <ServiceDetail
      serviceDetail={{
        ...SERVICE_DETAIL,
        id: '8384e278-af5e-4d4f-b5ae-905c859049ee', // change this to actual serviceId
      }}
    />
  ));
