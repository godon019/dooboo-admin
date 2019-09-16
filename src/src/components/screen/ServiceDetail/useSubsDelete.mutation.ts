import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { useCustomMutation } from '../../../utils/useCustomMutation';

interface Variable {
  id: string;
}

type AdapterInput = Variable;

interface Data {
  deleteSubs: { id: string };
}

const GRAPH_QL = gql`
  mutation deleteSubs($id: ID!) {
    deleteSubs(id: $id) {
      id
    }
  }
`;

type Adapter = (adapterInput: AdapterInput) => Variable;
const adapter: Adapter = ({ id }) => ({ id });

export const useSubsDelete = useCustomMutation<Data, Variable, AdapterInput>({
  refetchQueries: () => [GQL.subscriptions],
  adapter: adapter,
  dataProperty: 'deleteSubs',
  gql: GRAPH_QL,
});
