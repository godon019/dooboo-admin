import * as renderer from 'react-test-renderer';

import { SERVICE_DETAIL, SUBS_LIST } from '../ServiceDetail/mock';
import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
  wait,
} from '@testing-library/react';

import { AppProvider } from '../../../providers';
import React from 'react';
import ServiceDetail from '../ServiceDetail';
import ThemeProvider from '../../../providers/ThemeProvider';

const props = {
  onAddSubsClick: jest.fn(),
  onSubsClick: jest.fn(),
  onDeleteSubsClick: jest.fn(),
  serviceDetail: SERVICE_DETAIL,
  subsList: SUBS_LIST,
};

const component = (
  <AppProvider>
    <ThemeProvider>
      <ServiceDetail {...props} />
    </ThemeProvider>
  </AppProvider>
);

describe('[ServiceDetail] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[ServiceDetail] Interaction', () => {
  let renderResult: any;

  beforeAll(() => {
    renderResult = render(component);
  });

  it('simulate [onAddSubsClick] is called when corresponding button is clicked', () => {
    const addSubsButton = renderResult.getByTestId('addSubsButton');
    fireEvent.click(addSubsButton);
    expect(props.onAddSubsClick).toHaveBeenCalled();
  });

  it('simulate [onDeleteSubsClick] with desired [subs id] as parameter is called when corresponding buttons is clicked', () => {
    SUBS_LIST.map((subs, index) => {
      const chosenSubsId = subs.id;
      const deleteSubsButton = renderResult.getByTestId(
        `deleteSubsButton-${chosenSubsId}`,
      );
      fireEvent.click(deleteSubsButton);
      expect(props.onDeleteSubsClick.mock.calls[index][0]).toBe(chosenSubsId);
    });
  });
});
