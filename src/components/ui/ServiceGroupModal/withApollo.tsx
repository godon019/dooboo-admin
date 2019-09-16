import React, { useContext, useEffect, useState } from 'react';
import ServiceGroupModal, { ServiceGroupModalProps } from './ServiceGroupModal';
import { getDisplayName, useLoadingOverlay } from '../../../utils/withApollo';

import { DisplayState } from '../../../utils/DisplayState';
import { useServiceGroupCreate } from './useServiceGroupCreate.mutation';
import { useServiceGroupUpdate } from './useServiceGroupUpdate.mutation';

type PropsToSubstitute = Pick<ServiceGroupModalProps, 'onSubmit'>;
type PropsToUse = Pick<ServiceGroupModalProps, 'isNew'>;

export function WithServiceGroupApollo<
  T extends PropsToSubstitute & PropsToUse
>(WrappedComponent: React.FC<T>) {
  const hocComponent = (props: T) => {
    const create = useServiceGroupCreate();
    const update = useServiceGroupUpdate();
    const mutation = props.isNew ? create : update;
    const { mutate, result, error, loading } = mutation;

    useLoadingOverlay(
      `Service Group Modal ${props.isNew ? 'Create' : 'Update'} Mutation`,
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
