import React, { useContext, useEffect, useMemo, useState } from 'react';
import { localizeData, localizeData2 } from '../../../utils/withApollo';

import { DisplayState } from '../../../utils/DisplayState';
import { IServiceGroupScreen } from './ServiceGroup';
import { useServiceGroupDelete } from './useServiceGroupDelete.mutation';
import { useServiceGroups } from './useServiceGroups.query';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

type PropsToSubstitute = Pick<
  IServiceGroupScreen,
  'serviceGroupList' | 'onDeleteServiceGroupClick'
>;

export function withServiceGroupApollo<T extends PropsToSubstitute>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: Omit<T, keyof PropsToSubstitute>) => {
    const {
      result: qResult,
      error: qError,
      loading: qLoading,
    } = useServiceGroups();
    const {
      onDeleteClick,
      error: dError,
      result: dResult,
      loading: dLoading,
    } = useServiceGroupDelete();

    const localizedResult = useMemo(() => localizeData2(qResult), [qResult]);

    const propsToSubstitute: PropsToSubstitute = {
      serviceGroupList: localizedResult,
      onDeleteServiceGroupClick: onDeleteClick,
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
