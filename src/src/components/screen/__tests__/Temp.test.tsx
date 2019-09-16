import * as renderer from 'react-test-renderer';

import { fireEvent, getByTestId, render } from '@testing-library/react';

import Button from '../../shared/Button';
import React from 'react';
import Temp from '../Temp';
import ThemeProvider from '../../../providers/ThemeProvider';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[Temp] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer
      .create(
        <ThemeProvider>
          <Temp />
        </ThemeProvider>,
      )
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Temp] Interaction', () => {
  const component = (
    <ThemeProvider>
      <Temp {...props} />
    </ThemeProvider>
  );
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const btnInstance = renderResult.getByText('back to tab page');
    fireEvent.click(btnInstance);
    expect(props.history.goBack).toHaveBeenCalledTimes(1);
  });
});