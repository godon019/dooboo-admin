import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

import { GRAPHQL_URL } from '../apis/urls';
import authApi from '../apis/authApi';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';

// import { defaults, resolvers } from './LocalState';

const httpLink = new HttpLink({
  uri: `${GRAPHQL_URL}`,
  // Apollo example
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

const cache = new InMemoryCache();

// cache.writeData({
//   data: defaults,
// });

const authLink = setContext(async (_, { headers }) => {
  // const token = await AsyncStorage.getItem('token');
  const header = {
    ...headers,
    ...authApi.authHeader(),
  };
  // eslint-disable-next-line no-console
  console.log('header', header);
  return {
    headers: header,
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  // link: httpLink,

  cache,
  // resolvers,
});
