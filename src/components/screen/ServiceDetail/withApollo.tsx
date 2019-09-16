import React, { useContext, useEffect, useMemo, useState } from 'react';
import { localizeData, useLoadingOverlay } from '../../../utils/withApollo';

import { DisplayState } from '../../../utils/DisplayState';
import { IServiceDetail } from '.';
import { SubsNOp } from '../../../types';
import { deleteConfirmation } from '../../../utils/confirmAlert';
import { useSubsDelete } from './useSubsDelete.mutation';
import { useSubsList } from './useSubsList.query';

type Props = Pick<IServiceDetail, 'subsList' | 'onDeleteSubsClick'>;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withServiceDetailApollo<T extends IServiceDetail>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: Omit<T, keyof Props>) => {
    const serviceId = props.serviceDetail.id;
    const { result: qResult, error: qError, loading: qLoading } = useSubsList(
      serviceId,
    );
    const {
      mutate,
      error: dError,
      result: dResult,
      loading: dLoading,
    } = useSubsDelete();

    useLoadingOverlay('Subs delete mutation', dLoading, dError);

    const onDeleteClick = deleteConfirmation(mutate);

    // eslint-disable-next-line no-console
    console.log('qResult', qResult);
    // map to SubsNOp
    const subsNOp: Array<SubsNOp> = qResult.map(function({
      id,
      keyName,
      price,
      directLink,
      memo,
      subsOption: {
        id: subsOptionId,
        folderKeyName,
        pricePlan,
        currency,
        case: case1,
        periodUnit,
        periodType,
        promotion,
      },
    }): SubsNOp {
      return {
        id,
        case: case1,
        folderKeyName,
        directLink,
        keyName,
        pricePlan,
        currency,
        periodType,
        periodUnit,
        memo,
        serviceId,
        promotion,
      };
    });

    const localizedResult = useMemo(() => localizeData(subsNOp), [subsNOp]);

    const propsToSubstitute: Props = {
      subsList: localizedResult,
      onDeleteSubsClick: onDeleteClick,
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
          delete={{
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
