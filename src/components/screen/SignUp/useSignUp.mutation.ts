import { AdminSignUp, AuthPayload } from '../../../types';

import { GQL } from '../../../utils/Constants';
import gql from 'graphql-tag';
import { propertyNamesOf } from '../../../utils/withApollo';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  admin: AdminSignUp;
}
interface Data {
  signUpAdmin: AuthPayload;
}
const variableProperty = propertyNamesOf<Variable>()('admin');
const dataProperty = propertyNamesOf<Data>()('signUpAdmin');

export const GRAPH_QL = gql`
  mutation signUpAdminMutation($admin: AdminCreateInput!) {
    signUpAdmin(admin: $admin) {
      token
      admin {
        id
        name
        email
      }
    }
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading, called }] = useMutation<Data, Variable>(
    GRAPH_QL,
  );
  const [result, setResult] = useState(null);

  const mutate = async ({ email, password, name }: AdminSignUp) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.categories],
      variables: {
        [variableProperty]: {
          // be careful not to include any unnecessary property, coz typing is not enough to filter them out
          email,
          password,
          name,
        },
      },
    });

    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  };

  return { mutate, result, error, loading, called };
};

export { useCustomMutation as useSignUp };
