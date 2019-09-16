import React, { useEffect } from 'react';
import { getDisplayName, useLoadingOverlay } from '../../../utils/withApollo';

import { DisplayState } from '../../../utils/DisplayState';
import { SubsModalProps } from './SubsModal';
import { useSubsCreate } from './useSubsCreate.mutation';
import { useSubsUpdate } from './useSubsUpdate.mutation';

type PropsToSubstitute = Pick<SubsModalProps, 'onSubmit'>;
type PropsToUse = Pick<SubsModalProps, 'isNew'>;

export function withSubsModalApollo<T extends PropsToSubstitute & PropsToUse>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: T) => {
    const create = useSubsCreate();
    const update = useSubsUpdate();
    const mutation = props.isNew ? create : update;

    const { mutate, result, error, loading } = mutation;

    useLoadingOverlay(
      `Subs Modal ${props.isNew ? 'Create' : 'Update'} Mutation`,
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
