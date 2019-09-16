import { useEffect, useLayoutEffect, useState } from 'react';

import { GQL } from '../../../utils/Constants';
import { ServiceGroup } from '../../../types';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useQuery } from 'react-apollo';

interface Data {
  serviceGroups: ServiceGroup[];
}
export const GRAPH_QL = gql`
  query ${GQL.serviceGroups} {
    serviceGroups {
      id
      key
      description
    }
  }
`;
const dataProperty = propertyNamesOf<Data>()('serviceGroups');
const useCustomQuery = () => {
  const { data, error, loading } = useQuery<Data>(GRAPH_QL);
  const [result, setResult] = useState<ServiceGroup[]>([]);
  useEffect(() => {
    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  }, [data]);
  return { result, error, loading };
};

export { useCustomQuery as useServiceGroups };
