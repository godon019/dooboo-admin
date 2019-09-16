import React, { useContext, useEffect, useState } from 'react';
import { getDisplayName, useLoadingOverlay } from '../../../utils/withApollo';

import { CategoryModalProps } from './CategoryModal';
import { DisplayState } from '../../../utils/DisplayState';
import { LoadingContext } from '../../../providers/LoadingProvider';
import { useCategoryCreate } from './useCategoryCreate.mutation';
import { useCategoryUpdate } from './useCategoryUpdate.mutation';

type PropsToSubstitute = Pick<CategoryModalProps, 'onSubmit'>;
type PropsToUse = Pick<CategoryModalProps, 'isNew'>;

export function withCategoryModalApollo<
  T extends PropsToSubstitute & PropsToUse
>(WrappedComponent: React.FC<T>) {
  const hocComponent = (props: T) => {
    const create = useCategoryCreate();
    const update = useCategoryUpdate();
    const mutation = props.isNew ? create : update;
    const { mutate, result, error, loading } = mutation;

    useLoadingOverlay(
      `Category Modal ${props.isNew ? 'Create' : 'Update'} Mutation`,
      loading,
      error,
    );

    useEffect(() => {
      if (error) {
        alert(error.message);
      }
    }, [error]);

    const propsToSubstitute: PropsToSubstitute = {
      onSubmit: (values) => {
        mutate(values);
        props.onSubmit(values);
      },
    };
    const wholeProps: T = {
      ...props,
      ...propsToSubstitute,
    } as T;

    return (
      <WrappedComponent {...wholeProps}>
        <DisplayState isNew={props.isNew} {...mutation} />
      </WrappedComponent>
    );
  };

  hocComponent.displayName = `WithApollo(${getDisplayName(WrappedComponent)})`;

  return hocComponent;
}
