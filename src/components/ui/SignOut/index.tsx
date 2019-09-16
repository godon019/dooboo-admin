import React, { useContext } from 'react';

import { AuthContext } from '../../../providers/AuthProvider';
import { WithSignOutApollo } from './WithApollo';
import styled from 'styled-components';

const FloatOption = styled.div`
  position: fixed !important;
  right: 2%;
  top: 2%;
  z-index: 2;
`;

const Button = styled.button`
  background-color: #407fff;
  border-radius: 5px;
  font-size: 0.8em;
  padding: 0.4em 0.5em;
  color: white;
`;

export interface SignOut {
  show: boolean;
  onClick: () => void;
}

function SignOut({ show, onClick }: SignOut) {
  return (
    <FloatOption>
      {show ? <Button onClick={onClick}>로그아웃</Button> : null}
    </FloatOption>
  );
}
export { SignOut as PureSignOut };
export default WithSignOutApollo(SignOut);
