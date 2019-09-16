import { ServiceGroup, ServiceGroupUpdateMutation } from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  serviceGroup: ServiceGroupUpdateMutation;
}
interface Data {
  updateServiceGroup: boolean;
}
// get property name safely
const propertyNamesOf = <TObj>(obj: TObj = null) => (name: keyof TObj) => name;
const variableProperty = propertyNamesOf<Variable>()('serviceGroup');
const dataProperty = propertyNamesOf<Data>()('updateServiceGroup');

export const GRAPH_QL = gql`
  mutation updateServiceGroup($serviceGroup: ServiceGroupUpdateInput!) {
    updateServiceGroup(serviceGroup: $serviceGroup)
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading }] = useMutation<Data, Variable>(GRAPH_QL);
  const [result, setResult] = useState(null);

  const mutate = async ({
    id,
    key,
    description,
  }: ServiceGroupUpdateMutation) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.serviceGroups],
      variables: {
        [variableProperty]: {
          // be careful not to include any unnecessary property, coz typing is not enough to filter them out
          id,
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

export { useCustomMutation as useServiceGroupUpdate };
