import { useEffect, useLayoutEffect, useState } from 'react';

import { GQL } from '../../../utils/Constants';
import { ServiceServerOnlyValues } from '../../../types';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useQuery } from 'react-apollo';

interface Data {
  services: Array<ServiceServerOnlyValues>;
}
export const GRAPH_QL = gql`
  query ${GQL.services}{
  services{
    id
    keyName
    thumbnail
    image
    homepage
    iosAppStoreUrl
    androidPlayStoreUrl
    memo
    categoryId
    serviceGroupId
  }
}
`;
const dataProperty = propertyNamesOf<Data>()('services');
const useCustomQuery = () => {
  const { data, error, loading } = useQuery<Data>(GRAPH_QL);
  const [result, setResult] = useState<Array<ServiceServerOnlyValues>>([]);
  useEffect(() => {
    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  }, [data]);
  return { result, error, loading };
};

export { useCustomQuery as useServices };
