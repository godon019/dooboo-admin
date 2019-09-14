import { AppContext, AppProvider } from './providers/AppProvider';
import React, { useContext } from 'react';
import { hydrate, render } from 'react-dom';

import SwitchNavigator from './components/navigation/SwitchNavigator';

const rootElement = document.getElementById('app') as HTMLElement;

const Component = () => (
  <AppProvider>
    <SwitchNavigator />
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
