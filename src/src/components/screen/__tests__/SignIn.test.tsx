import * as renderer from 'react-test-renderer';

import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
  wait,
} from '@testing-library/react';

import React from 'react';
import SignIn from '../SignIn';
import ThemeProvider from '../../../providers/ThemeProvider';
import { getString } from '../../../../STRINGS';

const props = {
  onSubmitSuccess: jest.fn(),
};

describe('[SignIn] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer
      .create(
        <ThemeProvider>
          <SignIn />
        </ThemeProvider>,
      )
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[SignIn] Interaction', () => {
  const component = (
    <ThemeProvider>
      <SignIn {...props} />
    </ThemeProvider>
  );
  let renderResult: any;

  beforeAll(() => {
    renderResult = render(component);
  });

  it('[onSubmit] of Formik should not be called when submit button is clicked with empty inputs', async () => {
    const emailInput = renderResult.getByTestId('email');
    expect(emailInput.value).toBe('');
    const passwordInput = renderResult.getByTestId('password');
    expect(passwordInput.value).toBe('');
    const submitButton = renderResult.getByTestId('submit');
    fireEvent.click(submitButton);

    // formik is called asynchronously
    await wait(() => {
      expect(props.onSubmitSuccess).toHaveBeenCalledTimes(0);
    });
  });

  it('[onSubmit] of Formik should be called when [submit] button is clicked with valid input values', async () => {
    const email = 'whatssub123@gmail.com';
    const password = '1234';

    const emailInput = renderResult.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput.value).toBe(email);

    const passwordInput = renderResult.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput.value).toBe(password);

    const submitButton = renderResult.getByTestId('submit');
    fireEvent.click(submitButton);

    // formik is called asynchronously
    await wait(() => {
      expect(props.onSubmitSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('has email [error] massage when email is not valid', async () => {
    const email = 'notVailidEmail';

    // error message dosen't exist at first
    expect(renderResult.queryByTestId('error')).toBeNull();

    const emailInput = renderResult.getByTestId('email');
    fireEvent.focus(emailInput);
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.blur(emailInput);

    await wait(() => {
      const errorMessage = renderResult.getByTestId('error');
      expect(errorMessage).toBeDefined();
      expect(errorMessage.textContent).toBe(getString('EMAIL_ERROR'));
    });
  });
});
