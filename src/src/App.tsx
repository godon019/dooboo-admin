import { AppContext, AppProvider } from './providers';
import React, { useContext } from 'react';
import { hydrate, render } from 'react-dom';

import ApolloProviders from './providers/ApolloProvider';
import { AuthProvider } from './providers/AuthProvider';
import { LoadingProvider } from './providers/LoadingProvider';
import { LoggerProvider } from './providers/LoggerProvider';
import { RouteProvider } from './providers/RouteProvider';
import SwitchNavigator from './components/navigation/SwitchNavigator';
import ThemeProvider from './providers/ThemeProvider';

const rootElement = document.getElementById('app') as HTMLElement;
/**
 * test comment for fix circle-ci test error
 */
const Component = () => (
  <AppProvider>
    <ApolloProviders>
      <AuthProvider>
        <ThemeProvider>
          <LoggerProvider>
            <LoadingProvider>
              <RouteProvider>
                <SwitchNavigator />
              </RouteProvider>
            </LoadingProvider>
          </LoggerProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProviders>
  </AppProvider>
);

const renderApp = () => {
  if (rootElement.hasChildNodes()) {
    hydrate(<Component />, rootElement);
  } else {
    render(<Component />, rootElement);
  }
};

renderApp();

if (module.hot) {
  module.hot.accept(['./components/navigation/SwitchNavigator'], () =>
    renderApp(),
  );
}
