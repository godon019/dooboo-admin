import { Admin, AdminSignIn, AdminSignUp, AuthPayload } from '../../../types';
import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from 'react-apollo';

import { AuthContext } from '../../../providers/AuthProvider';
import { DisplayState } from '../../../utils/DisplayState';
import { ExecutionResult } from 'graphql';
import { ROUTE } from '../../../utils/Constants';
import { RouteContext } from '../../../providers/RouteProvider';
import { SignInProps } from '.';
import authApi from '../../../apis/authApi';
import gql from 'graphql-tag';

export const SIGN_IN_ADMIN = gql`
  query signInAdminMutation($admin: AdminSignInInput!) {
    signInAdmin(admin: $admin) {
      token
      admin {
        id
        email
        name
      }
    }
  }
`;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function WithSignInApollo<T extends SignInProps>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: T) => {
    const [
      requestSignIn,
      { loading, error, data, refetch, networkStatus },
    ] = useLazyQuery<{ signInAdmin: AuthPayload }, { admin: AdminSignIn }>(
      SIGN_IN_ADMIN,
    );

    const { signIn, isSignedIn, adminInfo } = useContext(AuthContext);
    const { route } = useContext(RouteContext);

    useEffect(() => {
      if (data && data.signInAdmin) {
        signIn(data.signInAdmin);
        // TODO: navigate to next
        route.history.push({
          pathname: ROUTE.main,
          state: {},
        });
      }
    }, [data]);

    return (
      <div>
        {isSignedIn ? (
          <>
            <div>Signed In</div>
          </>
        ) : (
          <WrappedComponent
            onSubmitSuccess={({ email, password }) => {
              const variables = { admin: { email, password } };
              requestSignIn({
                variables,
              });
            }}
            {...props}
          />
        )}
        {error && <div>{error.message}</div>}
        <DisplayState error={error} data={data} adminInfo={adminInfo} />
      </div>
    );
  };

  hocComponent.displayName = `WithSignInApollo(${getDisplayName(
    WrappedComponent,
  )})`;

  return hocComponent;
}
