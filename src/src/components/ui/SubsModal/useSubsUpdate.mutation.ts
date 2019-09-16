import {
  SubsNOpUpdateMutation,
  SubsOptionCreateInput,
  SubsUpdateInput,
} from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { useCustomMutation } from '../../../utils/useCustomMutation';

interface Variable {
  subs: SubsUpdateInput;
  subsOption: SubsOptionCreateInput;
}

type AdapterInput = SubsNOpUpdateMutation;

interface Data {
  updateSubs: string;
}

export const GRAPH_QL = gql`
  mutation updateSubs(
    $subs: SubsUpdateInput!
    $subsOption: SubsOptionCreateInput
  ) {
    updateSubs(subs: $subs, subsOption: $subsOption) {
      id
    }
  }
`;

type Adapter = (adapterInput: AdapterInput) => Variable;
const adapter: Adapter = ({
  id,
  folderKeyName,
  directLink,
  case: case1, // rename for preventing eslint error
  keyName,
  pricePlan,
  currency,
  periodUnit,
  periodType,
  memo,
  promotion,
}) => ({
  subs: {
    id,
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

export const useSubsUpdate = useCustomMutation<Data, Variable, AdapterInput>({
  refetchQueries: () => [GQL.subscriptions],
  adapter: adapter,
  dataProperty: 'updateSubs',
  gql: GRAPH_QL,
});
