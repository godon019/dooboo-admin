import React, { useEffect, useReducer, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { BrowserRouter } from 'react-router-dom';

interface RouteContext {
  route: WithRouter;
}

const RouteContext = React.createContext<RouteContext | null>(null);

type WithRouter = RouteComponentProps<any>;
interface InjectorProps {
  children: (route: WithRouter) => React.ReactNode;
}
const Injector = (props: InjectorProps & WithRouter) => {
  // props.history;
  const { children, ...route } = props;
  return <>{props.children(route)}</>;
};
const InjectWithRouter = withRouter(Injector);

const routeBy = (route, storybook) => {
  if (storybook) {
    return {
      history: { push: (str) => {} },
      ...route,
    } as WithRouter;
  } else {
    return route;
  }
};
interface Props {
  children: React.ReactNode;
  storybook?: boolean;
}
const RouteProvider = (props: Props) => {
  return (
    <BrowserRouter>
      <InjectWithRouter>
        {(route) => (
          <RouteContext.Provider
            value={{
              route: routeBy(route, props.storybook),
            }}
          >
            {props.children}
          </RouteContext.Provider>
        )}
      </InjectWithRouter>
    </BrowserRouter>
  );
};

export { RouteProvider, RouteContext };
