import CategoryModal, { CategoryModalProps } from './CategoryModal';
import React, { useContext, useState } from 'react';

import { Category } from '../../../types';
import { CategoryScreen } from '../../screen/Category/Category';

type ModalPropsToExclude = Pick<
  CategoryModalProps,
  'isNew' | 'isVisible' | 'category' | 'onClose' | 'onSubmit'
>;

type ComponentPropsToExclude = Pick<
  CategoryScreen,
  'onAddCategoryClick' | 'onUpdateCategoryClick'
>;

const createNewCategory = (): Category => ({
  id: '',
  key: '',
  description: '',
  released: false,
});

export function withCategoryModal<T extends ComponentPropsToExclude>(
  WrappedComponent: React.FC<T>,
) {
  const ComponentToReturn = (props: Omit<T, keyof ComponentPropsToExclude>) => {
    const [show, setShow] = useState<boolean>(false);
    const [Category, setCategory] = useState<Category>(createNewCategory());
    const [isNew, setIsNew] = useState<boolean>(false);

    const modalProps: ModalPropsToExclude = {
      isVisible: show,
      isNew: isNew,
      onClose: () => {
        setShow(false);
      },
      onSubmit: () => {
        setShow(false);
      },
      category: Category,
    };

    const componentPropsToExclude: ComponentPropsToExclude = {
      onAddCategoryClick: () => {
        setCategory(createNewCategory());
        setShow(true);
        setIsNew(true);
      },
      onUpdateCategoryClick: (Category: Category) => {
        setCategory(Category);
        setShow(true);
        setIsNew(false);
      },
    };
    const componentProps = {
      ...props,
      ...componentPropsToExclude,
    } as T;

    return (
      <>
        <CategoryModal {...modalProps} />
        <WrappedComponent {...componentProps} />
      </>
    );
  };

  return ComponentToReturn;
}
