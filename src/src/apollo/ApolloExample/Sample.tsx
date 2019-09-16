import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

function ApolloExample() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);
  // eslint-disable-next-line no-console

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}
export default ApolloExample;
