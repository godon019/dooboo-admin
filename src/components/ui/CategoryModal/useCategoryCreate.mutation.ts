import { Category, CategoryCreateMutation } from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  category: CategoryCreateMutation;
}
interface Data {
  createCategory: Category;
}
const variableProperty = propertyNamesOf<Variable>()('category');
const dataProperty = propertyNamesOf<Data>()('createCategory');

export const GRAPH_QL = gql`
  mutation createCategory($category: CategoryCreateInput!) {
    createCategory(category: $category) {
      id
      key
      released
    }
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading, called }] = useMutation<Data, Variable>(
    GRAPH_QL,
  );
  const [result, setResult] = useState(null);

  const mutate = async ({
    key,
    description,
    released,
  }: CategoryCreateMutation) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.categories],
      variables: {
        [variableProperty]: {
          // be careful not to include any unnecessary property, coz typing is not enough to filter them out
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

export { useCustomMutation as useCategoryCreate };
