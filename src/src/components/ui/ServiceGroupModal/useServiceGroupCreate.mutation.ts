import { ServiceGroup, ServiceGroupCreateMutation } from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  serviceGroup: ServiceGroupCreateMutation;
}
interface Data {
  createServiceGroup: ServiceGroup;
}
const variableProperty = propertyNamesOf<Variable>()('serviceGroup');
const dataProperty = propertyNamesOf<Data>()('createServiceGroup');

export const GRAPH_QL = gql`
  mutation createServiceGroup($serviceGroup: ServiceGroupCreateInput!) {
    createServiceGroup(serviceGroup: $serviceGroup) {
      id
      key
    }
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading }] = useMutation<Data, Variable>(GRAPH_QL);
  const [result, setResult] = useState(null);

  const mutate = async ({ key, description }: ServiceGroupCreateMutation) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.serviceGroups],
      variables: {
        [variableProperty]: {
          // be careful not to include any unnecessary property, coz typing is not enough to filter them out
          key,
          description,
        },
      },
    });

    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  };

  return { mutate, result, error, loading };
};

export { useCustomMutation as useServiceGroupCreate };
