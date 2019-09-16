import { Admin, AdminSignUp, AuthPayload } from '../../../types';
import React, { useContext, useEffect } from 'react';
import { getDisplayName, useLoadingOverlay } from '../../../utils/withApollo';

import { DisplayState } from '../../../utils/DisplayState';
import { ROUTE } from '../../../utils/Constants';
import { RouteContext } from '../../../providers/RouteProvider';
import { SignUpProps } from '.';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { useSignUp } from './useSignUp.mutation';

type PropsToExclude = Pick<SignUpProps, 'onSubmitSuccess'>;

export const SIGN_UP_ADMIN = gql`
  mutation signUpAdminMutation($admin: AdminCreateInput!) {
    signUpAdmin(admin: $admin) {
      token
      admin {
        id
        email
      }
    }
  }
`;

export function WithSignUpApollo<T extends PropsToExclude>(
  WrappedComponent: React.FC<T>,
) {
  const hocComponent = (props: Omit<T, keyof PropsToExclude>) => {
    const { mutate, ...rest } = useSignUp();
    const { route } = useContext(RouteContext);
    const { result, error, loading } = rest;
    useLoadingOverlay(`SignUp Mutation`, loading, error);

    useEffect(() => {
      if (result) {
        alert(
          '회원가입이 완료되었습니다. 관리자의 승인 이후에 로그인이 가능합니다',
        );
        route.history.push(ROUTE.signIn);
      }
    }, [result]);

    useEffect(() => {
      if (error) {
        alert(error.message);
      }
    }, [error]);

    const propsToExclude: PropsToExclude = {
      onSubmitSuccess: (values) => {
        mutate(values);
      },
    };
    const wholeProps: T = {
      ...props,
      ...propsToExclude,
    } as T;

    return (
      <div>
        <WrappedComponent {...wholeProps} />
        <DisplayState {...rest} />
      </div>
    );
  };

  hocComponent.displayName = `WithSignUpApollo(${getDisplayName(
    WrappedComponent,
  )})`;

  return hocComponent;
}
