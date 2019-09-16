import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { GQL } from '../../../utils/Constants';
import { confirmAlert } from 'react-confirm-alert'; // Import
import gql from 'graphql-tag';
import { useLoadingOverlay } from '../../../utils/withApollo';
import { useMutation } from 'react-apollo';
import { useState } from 'react';

interface Variable {
  id: string;
}
interface Data {
  deleteService: boolean;
}
// get property name safely
const propertyNamesOf = <TObj>(obj: TObj = null) => (name: keyof TObj) => name;
const variableProperty = propertyNamesOf<Variable>()('id');
const dataProperty = propertyNamesOf<Data>()('deleteService');

export const GRAPH_QL = gql`
  mutation deleteService($id: ID!) {
    deleteService(id: $id) {
      id
    }
  }
`;

const useCustomMutation = () => {
  const [_mutate, { error, loading }] = useMutation<Data, Variable>(GRAPH_QL);
  const [result, setResult] = useState(null);
  useLoadingOverlay('Service delete mutation', loading, error);

  const mutate = async ({ id }: Variable) => {
    const { data } = await _mutate({
      refetchQueries: () => [GQL.services],
      variables: {
        [variableProperty]: id,
      },
    });

    if (data && data[dataProperty]) {
      setResult(data[dataProperty]);
    }
  };

  const onDeleteClick = (id: string) => {
    confirmAlert({
      title: '삭제 확인',
      message: '정말 삭제하시겠습니까?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            mutate({ id });
          },
        },
        {
          label: 'No',
          onClick: () => {
            // do nothing
          },
        },
      ],
    });
  };

  return { onDeleteClick, result, error, loading };
};

export { useCustomMutation as useServiceDelete };
