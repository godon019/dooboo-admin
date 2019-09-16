import SubsModal, { PureSubsModal } from './SubsModal';
import { addDecorator, storiesOf } from '@storybook/react';

import React from 'react';
import { SUBS_LIST } from '../../screen/ServiceDetail/mock';
import { action } from '@storybook/addon-actions';

storiesOf('SubsModal', module)
  .add('pure', () => (
    <PureSubsModal
      isNew={true}
      subs={{ ...SUBS_LIST[0], keyName: '' }}
      isVisible={true}
      onClose={() => {
        action('close');
      }}
      onSubmit={action('submit')}
    />
  ))
  .add('with apollo C', () => (
    <SubsModal
      isNew={true}
      subs={{
        ...SUBS_LIST[0],
        serviceId: '9500fd95-34d6-4f84-addf-8c12c487da5d',
      }}
      isVisible={true}
      onClose={() => {
        action('close');
      }}
      onSubmit={action('submit')}
    />
  ))
  .add('with apollo U', () => (
    <SubsModal
      isNew={false}
      subs={{
        ...SUBS_LIST[0],
        id: '654b640a-9674-436f-baf9-b7b27c1ead5b',
      }}
      isVisible={true}
      onClose={() => {
        action('close');
      }}
      onSubmit={action('submit')}
    />
  ));
