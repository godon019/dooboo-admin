import React, { useEffect, useState } from 'react';

import { ApolloProvider as ApolloProviderHook } from '@apollo/react-hooks';
import { ApolloProvider as OriginalApolloProvider } from 'react-apollo';
import client from '../apollo/client';

const ApolloProviders = (props) => {
  return (
    <OriginalApolloProvider client={client}>
      <ApolloProviderHook client={client}>{props.children}</ApolloProviderHook>
    </OriginalApolloProvider>
  );
};

export default ApolloProviders;
