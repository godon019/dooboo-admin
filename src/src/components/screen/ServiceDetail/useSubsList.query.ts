import { Subs, SubsNOp } from '../../../types';
import { useEffect, useLayoutEffect, useState } from 'react';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useQuery } from 'react-apollo';

interface Data {
  subscriptions: Array<Subs>;
}
interface Variable {
  serviceId: string;
}
export const GRAPH_QL = gql`
query ${GQL.subscriptions}($serviceId: ID){
  subscriptions(serviceId: $serviceId){
    id
    keyName
    price
    directLink
    memo
    subsOption{
      id
      folderKeyName
      pricePlan
      currency
      case
      periodUnit
      periodType
      promotion
    }
  }
}
`;
const dataProperty = propertyNamesOf<Data>()('subscriptions');
const useCustomQuery = (serviceId) => {
  const { data, error, loading } = useQuery<Data, Variable>(GRAPH_QL, {
    variables: { serviceId: serviceId },
  });
  const [result, setResult] = useState<Array<Subs>>([]);
  useEffect(() => {
    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  }, [data]);
  return { result, error, loading };
};

export { useCustomQuery as useSubsList };
