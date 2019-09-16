import ServiceGroupModal, {
  ServiceGroupModalWithApollo,
} from './ServiceGroupModal';
import { addDecorator, storiesOf } from '@storybook/react';

import React from 'react';
import { SERVICE_GROUP_LIST } from '../../screen/ServiceGroup/mock';
import { action } from '@storybook/addon-actions';

const Story = () => (
  <ServiceGroupModal
    isVisible={true}
    isNew={true}
    serviceGroup={SERVICE_GROUP_LIST[0]}
    onClose={action('closeService')}
    onSubmit={action('SubmitClick')}
  />
);
storiesOf('ServiceGroupModal', module)
  .add('pure', () => <Story />)
  .add('withApollo-create', () => (
    <ServiceGroupModalWithApollo
      isVisible={true}
      isNew={true}
      serviceGroup={SERVICE_GROUP_LIST[0]}
      onClose={action('closeService')}
      onSubmit={action('SubmitClick')}
    />
  ))
  .add('withApollo-update', () => (
    <ServiceGroupModalWithApollo
      isVisible={true}
      isNew={false}
      serviceGroup={SERVICE_GROUP_LIST[0]}
      onClose={action('closeService')}
      onSubmit={action('SubmitClick')}
    />
  ));
