import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AuthContext } from '../../../providers/AuthProvider';
import { ROUTE } from '../../../utils/Constants';
import { RouteContext } from '../../../providers/RouteProvider';

interface Props {
  show: boolean;
  onClick: () => void;
}

export function WithSignOutApollo<T extends Props>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: Omit<T, keyof Props>) => {
    const { signOut, isSignedIn } = useContext(AuthContext);
    const { route } = useContext(RouteContext);

    const propsToPass: Props = {
      show: isSignedIn,
      onClick: () => {
        signOut();
        route.history.push(ROUTE.signIn);
      },
    };

    return <WrappedComponent {...(props as any)} {...propsToPass} />;
  };
  return hocComponent;
}
