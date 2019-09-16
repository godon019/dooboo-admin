import { useEffect, useLayoutEffect, useState } from 'react';

import { Category } from '../../../types';
import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useQuery } from 'react-apollo';

interface Data {
  categories: Category[];
}
export const GRAPH_QL = gql`
  query ${GQL.categories} {
    categories {
      id
      key
      description
      released
    }
  }
`;
const dataProperty = propertyNamesOf<Data>()('categories');
const useCustomQuery = () => {
  const { data, error, loading } = useQuery<Data>(GRAPH_QL);
  const [result, setResult] = useState<Category[]>([]);
  useEffect(() => {
    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  }, [data]);
  return { result, error, loading };
};

export { useCustomQuery as useCategories };
