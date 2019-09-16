import {
  SubsCreateInput,
  SubsNOpCreateMutation,
  SubsOptionCreateInput,
} from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  subs: SubsCreateInput;
  subsOption: SubsOptionCreateInput;
}

type AdapterInput = SubsNOpCreateMutation;

interface Data {
  createSubs: string;
}
const dataProperty = propertyNamesOf<Data>()('createSubs');

export const GRAPH_QL = gql`
  mutation createSubs(
    $subs: SubsCreateInput!
    $subsOption: SubsOptionCreateInput
  ) {
    createSubs(subs: $subs, subsOption: $subsOption) {
      id
    }
  }
`;

const queriesToRefetch = [GQL.subscriptions];

// make sure `Variable` doesn't include any unnecessary variables
// with adapter pattern, it is easier to adapt to server side schema modification
const adapter = ({
  folderKeyName,
  directLink,
  case: case1, // rename for preventing eslint error
  keyName,
  pricePlan,
  currency,
  periodUnit,
  periodType,
  memo,
  serviceId,
  promotion,
}: AdapterInput): Variable => ({
  subs: {
    serviceId,
    keyName,
    price: pricePlan,
    directLink,
    memo,
  },
  subsOption: {
    folderKeyName,
    pricePlan,
    currency,
    case: case1,
    periodUnit,
    periodType,
    promotion,
  },
});

// more control and readability compared to global `useCustomMutaion`
const useCustomMutation = () => {
  const [_mutate, { error, loading }] = useMutation<Data, Variable>(GRAPH_QL);
  const [result, setResult] = useState(null);
  const mutate = async (variables: AdapterInput) => {
    const { data } = await _mutate({
      refetchQueries: () => [...queriesToRefetch],
      variables: adapter(variables),
    });

    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  };

  return { mutate, result, error, loading };
};

export { useCustomMutation as useSubsCreate };
