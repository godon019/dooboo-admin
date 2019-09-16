import React, { useEffect, useReducer, useState } from 'react';

import authApi from '../apis/authApi';

interface AuthContext {
  adminInfo: object;
  isSignedIn: boolean;
  signIn: (user: any) => void;
  signOut: () => void;
  isReady: boolean;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const AuthProvider = (props) => {
  // const [state, dispatch] = useReducer(reducer, initialState);

  const [isSignedIn, setSignedIn] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const user = authApi.getUserData();
    if (user) {
      setSignedIn(true);
      setAdminInfo(user);
    }
    setReady(true);
  }, []);

  const signIn = (userInfo) => {
    authApi.saveUserData(userInfo);
    setSignedIn(true);
    setAdminInfo(userInfo);
  };

  const signOut = () => {
    authApi.removeUserData();
    setSignedIn(false);
    setAdminInfo({});
  };

  const contexts: AuthContext = {
    adminInfo,
    isSignedIn,
    signIn,
    signOut,
    isReady,
  };
  return (
    <AuthContext.Provider value={contexts}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
