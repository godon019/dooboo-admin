import React, { useContext, useEffect, useState } from 'react';
import { getDisplayName, useLoadingOverlay } from '../../../utils/withApollo';

import { DisplayState } from '../../../utils/DisplayState';
import { ServiceModalProps } from '.';
import { useCategories } from '../../screen/Category/useCategories.query';
import { useServiceCreate } from './useServiceCreate.mutation';
import { useServiceGroups } from '../../screen/ServiceGroup/useServiceGroups.query';
import { useServiceUpdate } from './useServiceUpdate.mutation';

type PropsToSubstitute = Pick<ServiceModalProps, 'onSubmitFinishedSuccess'>;
type PropsToExclude = Pick<ServiceModalProps, 'categories' | 'serviceGroups'>;
type PropsToUse = Pick<ServiceModalProps, 'isNew'>;

export function withServiceModalApollo<
  T extends PropsToExclude & PropsToUse & PropsToSubstitute
>(WrappedComponent: React.FC<T>) {
  const hocComponent = (
    props: Omit<T, keyof PropsToExclude> & PropsToSubstitute,
  ) => {
    const {
      result: catResult,
      error: catError,
      loading: catLoading,
    } = useCategories();

    const {
      result: servResult,
      error: servError,
      loading: servLoading,
    } = useServiceGroups();

    const create = useServiceCreate();
    const update = useServiceUpdate();
    const mutation = props.isNew ? create : update;
    const { mutate, result, error, loading } = mutation;

    useLoadingOverlay(
      `Service Modal ${props.isNew ? 'Create' : 'Update'} Mutation`,
      loading,
      error,
    );

    useEffect(() => {
      if (error) {
        alert(error.message);
      }
    }, [error]);

    const propsToSubstitute: PropsToSubstitute = {
      onSubmitFinishedSuccess: (values) => {
        mutate(values);
        props.onSubmitFinishedSuccess(values);
      },
    };
    const propsToExclude: PropsToExclude = {
      categories: catResult,
      serviceGroups: servResult,
    };
    const wholeProps: T = {
      ...props,
      ...propsToExclude,
      ...propsToSubstitute,
    } as T;

    return (
      <WrappedComponent {...wholeProps}>
        <DisplayState
          {...mutation}
          categories={{
            result: catResult,
            error: catError,
            loading: catLoading,
          }}
          serviceGroups={{
            result: servResult,
            error: servError,
            loading: servLoading,
          }}
        />
      </WrappedComponent>
    );
  };

  hocComponent.displayName = `WithApollo(${getDisplayName(WrappedComponent)})`;

  return hocComponent;
}
