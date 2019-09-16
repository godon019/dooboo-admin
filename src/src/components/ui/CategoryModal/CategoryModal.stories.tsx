import CategoryModal, { PureCategoryModal } from './CategoryModal';
import { addDecorator, storiesOf } from '@storybook/react';

import { CATEGORY_LIST } from '../../screen/Category/mock';
import React from 'react';
import { action } from '@storybook/addon-actions';

const Story = () => (
  <PureCategoryModal
    isNew={true}
    isVisible={true}
    category={CATEGORY_LIST[0]}
    onClose={action('closeService')}
    onSubmit={action('SubmitClick')}
  />
);
storiesOf('CategoryModal', module)
  .add('pure', () => <Story />)
  .add('withApollo', () => (
    <CategoryModal
      isNew={true}
      isVisible={true}
      category={CATEGORY_LIST[0]}
      onClose={action('closeService')}
      onSubmit={action('SubmitClick')}
    />
  ));
