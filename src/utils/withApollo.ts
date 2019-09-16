import { useContext, useEffect } from 'react';

import { ApolloError } from 'apollo-boost';
import { LoadingContext } from '../providers/LoadingProvider';
import { confirmAlert } from 'react-confirm-alert';
import { localize } from '../../STRINGS_DB';

export const propertyNamesOf = <TObj>(obj: TObj = null) => (name: keyof TObj) =>
  name;

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const localizeData = <T extends { keyName: string }>(
  serviceList: Array<T>,
) => {
  return serviceList.map((svc) => {
    return {
      ...svc,
      nameKr: localize(svc.keyName),
      nameEn: localize(svc.keyName, 'en'),
    };
  });
};

export const localizeData2 = <T extends { key: string }>(
  serviceList: Array<T>,
) => {
  return serviceList.map((svc) => {
    return {
      ...svc,
      nameKr: localize(svc.key),
      nameEn: localize(svc.key, 'en'),
    };
  });
};

export const useLoadingOverlay = (
  str: string,
  loading: boolean,
  error: ApolloError,
) => {
  const { setLoadingObject } = useContext(LoadingContext);

  useEffect(() => {
    if (loading) {
      setLoadingObject(str, true);
    } else {
      setLoadingObject(str, false);
    }
    if (error) {
      setLoadingObject(str, false);
    }
  }, [loading, error]);
};
