import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import { AppContext } from '../../contexts';
import { AuthContext } from '../../providers/AuthProvider';
import Category from '../screen/Category/Category';
import { Frame } from '../shared/Frame/Frame';
import Intro from '../screen/Intro';
import MainWithServiceModal from '../screen/Main';
import { ROUTE } from '../../utils/Constants';
import { RouteContext } from '../../providers/RouteProvider';
import { SERVICE_LIST } from '../screen/Main/mock';
import ServiceDetail from '../screen/ServiceDetail';
import { ServiceFront } from '../../types';
import ServiceGroupScreen from '../screen/ServiceGroup/ServiceGroup';
import ServiceModal from '../shared/ServiceModal';
import SignIn from '../screen/SignIn';
import SignOut from '../ui/SignOut';
import SignUp from '../screen/SignUp';
import Temp from '../screen/Temp';

const MakeSureSignedIn: React.FC = (props) => {
  const { isSignedIn } = useContext(AuthContext);
  return isSignedIn ? <>{props.children}</> : <Redirect to={ROUTE.signIn} />;
};

function SwitchNavigator(props: {}) {
  const { isSignedIn, isReady } = useContext(AuthContext);
  const { route } = useContext(RouteContext);
  const [service, setService] = useState(null);
  // eslint-disable-next-line no-console
  console.log('service', service);
  return (
    <Frame>
      {isReady && (
        <>
          <SignOut />
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <MakeSureSignedIn>
                  <Redirect to={ROUTE.main} />
                </MakeSureSignedIn>
              )}
            />
            {/* Sign In */}
            <Route
              path={ROUTE.signIn}
              render={() =>
                isSignedIn ? (
                  <Redirect to={ROUTE.main} />
                ) : (
                  <SignIn
                    onSignUpClick={() => {
                      route.history.push(ROUTE.signUp);
                    }}
                  />
                )
              }
            />
            {/* Sign Up */}
            <Route path={ROUTE.signUp} render={(param) => <SignUp />} />
            {/* Main */}
            <Route
              path={ROUTE.main}
              render={(param) => (
                <MakeSureSignedIn>
                  <MainWithServiceModal
                    {...param}
                    {...props}
                    onServiceClick={(serviceInfo: ServiceFront) => {
                      setService(serviceInfo);
                      route.history.push(ROUTE.serviceDetail);
                    }}
                  />
                </MakeSureSignedIn>
              )}
            />
            {/* Service Group */}
            <Route
              path={ROUTE.serviceGroup}
              render={(param) => (
                <MakeSureSignedIn>
                  <ServiceGroupScreen />
                </MakeSureSignedIn>
              )}
            />
            {/* Category */}
            <Route
              path={ROUTE.category}
              render={(param) => (
                <MakeSureSignedIn>
                  <Category />
                </MakeSureSignedIn>
              )}
            />
            {/* Service Detail */}
            <Route
              path={ROUTE.serviceDetail}
              render={() => (
                <MakeSureSignedIn>
                  {service ? (
                    <ServiceDetail serviceDetail={service} />
                  ) : (
                    <div>choose service...</div>
                  )}
                </MakeSureSignedIn>
              )}
            />
          </Switch>
        </>
      )}
    </Frame>
  );
}

export default SwitchNavigator;
