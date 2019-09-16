import { addDecorator, storiesOf } from '@storybook/react';

import React from 'react';
import { SERVICE_DETAIL } from '../../screen/ServiceDetail/mock';
import ServiceModal from '../../shared/ServiceModal';
import { action } from '@storybook/addon-actions';

const Story = () => (
  <ServiceModal
    isNew={false}
    show={true}
    serviceInfo={SERVICE_DETAIL}
    onSubmitFinishedSuccess={action('submit')}
    onCloseServiceClick={action('closeService')}
    onHandleImgChange={action('HandleImageChange')}
  />
);
storiesOf('ServiceModal', module)
  .add('withApollo-update', () => <Story />)
  .add('withApollo-create', () => (
    <ServiceModal
      isNew={true}
      show={true}
      serviceInfo={SERVICE_DETAIL}
      onSubmitFinishedSuccess={action('submit')}
      onCloseServiceClick={action('closeService')}
      onHandleImgChange={action('HandleImageChange')}
    />
  ));
