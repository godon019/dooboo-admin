import React, { useContext, useEffect, useMemo, useState } from 'react';

import { CategoryScreen } from './Category';
import { DisplayState } from '../../../utils/DisplayState';
import { localizeData2 } from '../../../utils/withApollo';
import { useCategories } from './useCategories.query';
import { useCategoryDelete } from './useCategoryDelete.mutation';

type PropsToSubstitute = Pick<
  CategoryScreen,
  'categoryList' | 'onDeleteCategoryClick'
>;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withCategoriesApollo<T extends PropsToSubstitute>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: Omit<T, keyof PropsToSubstitute>) => {
    const {
      result: qResult,
      error: qError,
      loading: qLoading,
    } = useCategories();
    const {
      onDeleteClick,
      error: dError,
      result: dResult,
      loading: dLoading,
    } = useCategoryDelete();

    const localizedResult = useMemo(() => localizeData2(qResult), [qResult]);

    const propsToSubstitute: PropsToSubstitute = {
      categoryList: localizedResult,
      onDeleteCategoryClick: onDeleteClick,
    };
    const wholeProps: T = {
      ...props,
      ...propsToSubstitute,
    } as T;

    return (
      <>
        <WrappedComponent {...wholeProps} />
        <DisplayState
          query={{ error: qError, result: qResult, loading: qLoading }}
          deleteMutation={{
            error: dError,
            result: dResult,
            loading: dLoading,
          }}
        />
      </>
    );
  };

  hocComponent.displayName = `withApollo(${getDisplayName(WrappedComponent)})`;

  return hocComponent;
}
