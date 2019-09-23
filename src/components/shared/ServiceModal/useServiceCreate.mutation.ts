import { ServiceCreateMutation, ServiceServerOnlyValues } from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  service: ServiceCreateMutation;
}
interface Data {
  createService: ServiceServerOnlyValues;
}
const variableProperty = propertyNamesOf<Variable>()('service');
const dataProperty = propertyNamesOf<Data>()('createService');

export const GRAPH_QL = gql`
  mutation createService($service: ServiceCreateInput!) {
    createService(service: $service) {
      id
      keyName
      thumbnail
    }
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading }] = useMutation<Data, Variable>(GRAPH_QL);
  const [result, setResult] = useState(null);

  const mutate = async ({
    keyName,
    thumbnail,
    homepage,
    categoryId,
    memo,
  }: ServiceCreateMutation) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.services],
      variables: {
        [variableProperty]: {
          // be careful not to include any unnecessary property, coz typing is not enough to filter them out
          keyName,
          thumbnail,
          homepage,
          categoryId,
          memo,
        },
      },
    });

    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  };

  return { mutate, result, error, loading };
};

export { useCustomMutation as useServiceCreate };
