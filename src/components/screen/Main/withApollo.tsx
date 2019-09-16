import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ServiceFront, ServiceServerOnlyValues } from '../../../types';

import { DisplayState } from '../../../utils/DisplayState';
import { IMain } from '.';
import { getDisplayName } from '../../../utils/withApollo';
import { localize } from '../../../../STRINGS_DB';
import { useServiceDelete } from './useServiceDelete.mutation';
import { useServices } from './useServices.query';

const localization = (
  serviceList: Array<ServiceServerOnlyValues>,
): ServiceFront[] => {
  return serviceList.map((svc) => {
    return {
      ...svc,
      nameKr: localize(svc.keyName),
      name: localize(svc.keyName, 'en'),
    };
  });
};

type PropsToSubstitute = Pick<IMain, 'serviceList' | 'onDeleteServiceClick'>;

export function withServicesApollo<T extends PropsToSubstitute>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: Omit<T, keyof PropsToSubstitute>) => {
    const { result: qResult, error: qError, loading: qLoading } = useServices();
    const {
      onDeleteClick,
      error: dError,
      result: dResult,
      loading: dLoading,
    } = useServiceDelete();

    const localizedResult = useMemo(() => localization(qResult), [qResult]);

    const propsToSubstitute: PropsToSubstitute = {
      serviceList: localizedResult,
      onDeleteServiceClick: onDeleteClick,
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
