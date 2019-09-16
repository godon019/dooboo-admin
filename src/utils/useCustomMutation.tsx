import { useMutation } from 'react-apollo';
import { useState } from 'react';

// type safe
// make sure not including any unnecessary values
// explicitly expose values that we might actually use
// hide trivial-error-prone features (getting result when it is ready)
// encapsulate boiler plates -> easier updates when breaking changes
export const useCustomMutation = <Data, Variable, AdapterInput>({
  refetchQueries,
  adapter,
  dataProperty,
  gql,
}: {
  refetchQueries: () => Array<string>;
  adapter: (adapterVariable: AdapterInput) => Variable;
  dataProperty: keyof Data;
  gql: any;
}) => {
  return () => {
    const [_mutate, { error, loading }] = useMutation<Data, Variable>(gql);
    const [result, setResult] = useState(null);
    const mutate = async (variables: AdapterInput) => {
      const { data } = await _mutate({
        refetchQueries,
        variables: adapter(variables),
      });

      if (data && data[dataProperty]) {
        setResult(data[dataProperty]);
      }
    };

    return { mutate, result, error, loading };
  };
};
