import { CategoryUpdateMutation } from '../../../types';
import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  category: CategoryUpdateMutation;
}
interface Data {
  updateCategory: boolean;
}
// get property name safely
const propertyNamesOf = <TObj>(obj: TObj = null) => (name: keyof TObj) => name;
const variableProperty = propertyNamesOf<Variable>()('category');
const dataProperty = propertyNamesOf<Data>()('updateCategory');

export const GRAPH_QL = gql`
  mutation updateCategory($category: CategoryUpdateInput!) {
    updateCategory(category: $category)
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading, called }] = useMutation<Data, Variable>(
    GRAPH_QL,
  );
  const [result, setResult] = useState(null);

  const mutate = async ({
    id,
    key,
    description,
    released,
  }: CategoryUpdateMutation) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.categories],
      variables: {
        [variableProperty]: {
          // be careful not to include any unnecessary property, coz typing is not enough to filter them out
          id,
          key,
          description,
          released,
        },
      },
    });

    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  };

  return { mutate, result, error, loading, called };
};

export { useCustomMutation as useCategoryUpdate };
