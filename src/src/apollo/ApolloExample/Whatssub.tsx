import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

function WhatssubExample() {
  const { loading, error, data } = useQuery(gql`
    {
      users {
        id
        name
      }
    }
  `);
  // eslint-disable-next-line no-console
  console.log('error', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id, name }) => (
    <div key={id}>
      <p>
        `{id}, {name}`
      </p>
    </div>
  ));
}
export default WhatssubExample;
