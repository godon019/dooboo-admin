import CategoryWithApollo, { PureCategoryScreen } from './Category';
import React, { useState } from 'react';
import { addDecorator, storiesOf } from '@storybook/react';

import { CATEGORY_LIST } from './mock';
import { FrameDecorator } from '../../../../.storybook/decorators';
import { action } from '@storybook/addon-actions';

const PureMainStory = () => {
  const [categoryList, setCategoryList] = useState([]);
  setTimeout(() => {
    setCategoryList(CATEGORY_LIST);
  }, 200);
  return (
    <PureCategoryScreen
      categoryList={categoryList}
      onAddCategoryClick={action('onAddCategory')}
      onUpdateCategoryClick={action('onUpdate')}
      onDeleteCategoryClick={action('onDeleteCategory')}
    />
  );
};

storiesOf('Category', module)
  .addDecorator(FrameDecorator)
  .add('default', () => <PureMainStory />)
  .add('ㄴiphonex', () => <PureMainStory />, {
    viewport: { defaultViewport: 'iphonex' },
  })
  .add('withApollo', () => <CategoryWithApollo />);
