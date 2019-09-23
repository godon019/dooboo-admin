import { ServiceServerOnlyValues, ServiceUpdateMutation } from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  service: ServiceUpdateMutation;
}
interface Data {
  // other mutations return bool, but this is exception
  updateService: ServiceServerOnlyValues;
}
// get property name safely
const propertyNamesOf = <TObj>(obj: TObj = null) => (name: keyof TObj) => name;
const variableProperty = propertyNamesOf<Variable>()('service');
const dataProperty = propertyNamesOf<Data>()('updateService');

export const GRAPH_QL = gql`
  mutation updateService($service: ServiceUpdateInput!) {
    updateService(service: $service) {
      id
      keyName
      thumbnail
      categoryId
    }
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading }] = useMutation<Data, Variable>(GRAPH_QL);
  const [result, setResult] = useState(null);

  const mutate = async ({
    id,
    keyName,
    thumbnail,
    homepage,
    categoryId,
    memo,
  }: ServiceUpdateMutation) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.services],
      variables: {
        [variableProperty]: {
          // be careful not to include any unnecessary property, coz typing is not enough to filter them out
          id,
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

export { useCustomMutation as useServiceUpdate };
