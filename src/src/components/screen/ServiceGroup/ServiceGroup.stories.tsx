import React, { useState } from 'react';
import ServiceGroup, {
  PureServiceGroupScreen,
  ServiceGroupScreenWModal,
} from './ServiceGroup';
import { addDecorator, storiesOf } from '@storybook/react';

import { FrameDecorator } from '../../../../.storybook/decorators';
import { SERVICE_GROUP_LIST } from './mock';
import { action } from '@storybook/addon-actions';

const Story = () => {
  const [serviceGroupList, setServiceGroupList] = useState([]);
  setTimeout(() => {
    setServiceGroupList(SERVICE_GROUP_LIST);
  }, 200);
  return (
    <PureServiceGroupScreen
      serviceGroupList={serviceGroupList}
      onAddServiceGroupClick={action('onAddServiceGroup')}
      onDeleteServiceGroupClick={action('onDeleteServiceGroup')}
      onUpdateServiceGroupClick={action('onUpdate')}
    />
  );
};

storiesOf('ServiceGroup', module)
  .addDecorator(FrameDecorator)
  .add('pure', () => <Story />)
  .add(
    'ㄴiphonex',
    () => (
      <PureServiceGroupScreen
        serviceGroupList={SERVICE_GROUP_LIST}
        onAddServiceGroupClick={action('onAddServiceGroup')}
        onDeleteServiceGroupClick={action('onDeleteServiceGroup')}
        onUpdateServiceGroupClick={action('onUpdate')}
      />
    ),
    {
      viewport: { defaultViewport: 'iphonex' },
    },
  )
  .add('with Modal', () => (
    <ServiceGroupScreenWModal
      serviceGroupList={SERVICE_GROUP_LIST}
      onDeleteServiceGroupClick={action('onDeleteServiceGroup')}
    />
  ))
  .add('with Apollo', () => <ServiceGroup />);
