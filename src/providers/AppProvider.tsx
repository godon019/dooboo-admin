import React, { useReducer } from 'react';

import { AppContext } from '../contexts';
import STRINGS from '../../STRINGS';
import { ThemeType } from '../theme';

const AppConsumer = AppContext.Consumer;

export interface IAction {
  type: 'reset-user' | 'set-user' | 'change-theme-mode';
  payload: any;
}

export interface IState {
  theme: ThemeType;
}
interface IProps {
  value?: {
    state?: IState;
    dispatch?: IAction;
  };
  children?: any;
}

const initialState: IState = {
  theme: ThemeType.LIGHT,
};

const changeTheme = (dispatch, state) => {
  let payload: object;
  if (state.theme === ThemeType.LIGHT) {
    payload = {
      theme: ThemeType.DARK,
    };
  } else {
    payload = {
      theme: ThemeType.LIGHT,
    };
  }
  dispatch({
    type: 'change-theme-mode',
    payload,
  });
};

const reducer = (state: IState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'change-theme-mode':
      return { ...state, theme: payload.theme };
    default:
      return null;
  }
};

const AppProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contexts = {
    state,
    dispatch,
  };
  return (
    <AppContext.Provider value={contexts}>{props.children}</AppContext.Provider>
  );
};

export { AppConsumer, AppProvider, AppContext };
