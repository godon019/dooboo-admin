import { AppContext, AppProvider } from '../AppProvider';
import React, { useContext } from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import { ThemeType } from '../../theme';

describe('[AppProvider] rendering test', () => {
  const component = <AppProvider />;

  it('component and snapshot matches', () => {
    const { container } = render(component);
    expect(container.firstChild).toMatchSnapshot();
  });
});

const props = {
  user: {
    displayName: 'dooboolab',
    age: 30,
    job: '',
  },
};
const initState = {
  theme: ThemeType.LIGHT,
  user: {
    displayName: '',
    age: 0,
    job: '',
  },
  show: false,
  id: null,
  name: null,
  nameKr: null,
  thumbnail: null,
};
const testIDs = {
  wholeState: 'whole-state',
  setUser: 'set-user',
  resetUser: 'reset-user',
  changeTheme: 'change-theme',
  showModal: 'show-modal',
  showModalWithParam: 'show-modal-with-param',
  closeModal: 'close-modal',
  setDefault: 'setDefault',
  resultUserDN: 'result-user-displayName',
  resultUserAge: 'result-user-age',
  resultUserJob: 'result-user-job',
  resultTheme: 'result-theme',
  resultModalStatus: 'result-modal-status',
  resultId: 'result-id',
  resultName: 'result-name',
  resultNameKr: 'result-nameKr',
  resultIcon: 'result-thumbnail',
};
const TempChild = ({ user }) => {
  const { state, dispatch } = useContext(AppContext);
  const dispatchers = {
    resetUser: (e) =>
      dispatch({
        type: testIDs.resetUser,
        payload: {},
      }),
    setUser: (e) =>
      dispatch({
        type: testIDs.setUser,
        payload: user,
      }),
    changeTheme: () =>
      dispatch({
        type: 'change-theme-mode',
        payload: {
          theme: ThemeType.DARK,
        },
      }),
    setDefault: () =>
      dispatch({
        type: 'default',
        payload: {},
      }),
  };
  return (
    <>
      <button data-testid={testIDs.setUser} onClick={dispatchers.setUser}>
        set-user
      </button>
      <button data-testid={testIDs.resetUser} onClick={dispatchers.resetUser}>
        reset-user
      </button>
      <button
        data-testid={testIDs.changeTheme}
        onClick={dispatchers.changeTheme}
      >
        change-theme
      </button>
      <button data-testid={testIDs.setDefault} onClick={dispatchers.setDefault}>
        set-default
      </button>
      <div>
        <label>User: displayName</label>
        <span data-testid={testIDs.resultUserDN}>
          {(state && state.user && state.user.displayName) || ''}
        </span>
        <label>User: age</label>
        <span data-testid={testIDs.resultUserAge}>
          {(state && state.user && state.user.age) || ''}
        </span>
        <label>User: job</label>
        <span data-testid={testIDs.resultUserJob}>
          {(state && state.user && state.user.job) || ''}
        </span>
      </div>
      <div>
        <label>Theme</label>
        <span data-testid={testIDs.resultTheme}>{state && state.theme}</span>
        <label>Modal Status</label>
        <span data-testid={testIDs.resultModalStatus}>
          {(state && JSON.stringify(state.show)) || 'false'}
        </span>
      </div>
      <div data-testid={testIDs.wholeState}>{JSON.stringify(state)}</div>
    </>
  );
};
describe('[AppProvider] interactions', () => {
  let renderResult;
  const Component = (
    <AppProvider>
      <TempChild {...props} />
    </AppProvider>
  );

  beforeAll(() => {
    renderResult = render(Component);
  });
  it('should check [set-user] actions', () => {
    const setUser = renderResult.getByTestId(testIDs.setUser);
    const resultUserDN = renderResult.getByTestId(testIDs.resultUserDN);
    const resultUserAge = renderResult.getByTestId(testIDs.resultUserAge);
    const resultUserJob = renderResult.getByTestId(testIDs.resultUserJob);
    fireEvent.click(setUser);
    expect(resultUserDN.textContent).toEqual(props.user.displayName);
    expect(Number(resultUserAge.textContent)).toEqual(props.user.age);
    expect(resultUserJob.textContent).toEqual(props.user.job);
  });
  it('should check [reset-user] actions', () => {
    const resetUser = renderResult.getByTestId(testIDs.resetUser);
    const resultUserDN = renderResult.getByTestId(testIDs.resultUserDN);
    const resultUserAge = renderResult.getByTestId(testIDs.resultUserAge);
    const resultUserJob = renderResult.getByTestId(testIDs.resultUserJob);
    fireEvent.click(resetUser);
    expect(resultUserDN.textContent).toEqual(initState.user.displayName);
    expect(Number(resultUserAge.textContent)).toEqual(initState.user.age);
    expect(resultUserJob.textContent).toEqual(initState.user.job);
  });
  it('should check [change-theme-mode] actions', () => {
    const changeThemeBtn = renderResult.getByTestId(testIDs.changeTheme);
    const resultTheme = renderResult.getByTestId(testIDs.resultTheme);
    fireEvent.click(changeThemeBtn);
    expect(resultTheme.textContent).toEqual(ThemeType.DARK);
  });
  it('should check default actions', () => {
    const setDefaultBtn = renderResult.getByTestId(testIDs.setDefault);
    fireEvent.click(setDefaultBtn);
    // must define DOM contains states after dispatch fired
    const resultWholeState = renderResult.getByTestId(testIDs.wholeState);
    const wholeState =
      (resultWholeState.textContent &&
        JSON.parse(resultWholeState.textContent)) ||
      null;
    expect(wholeState).toBeNull();
  });
});
