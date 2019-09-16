import * as renderer from 'react-test-renderer';

import { NUMBER_OF_ITEMS_ON_PAGE, PureMain } from '../Main';
import React, { useContext } from 'react';
import {
  cleanup,
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
  wait,
} from '@testing-library/react';

import { AppProvider } from '../../../providers';
import { SERVICE_LIST } from '../Main/mock';
import { TEST_ID_OF_CELL } from '../Main/ServiceTable';
import ThemeProvider from '../../../providers/ThemeProvider';

const props = {
  onAddServiceClick: jest.fn(),
  onServiceClick: jest.fn(),
  onUpdateServiceClick: jest.fn(),
  onDeleteServiceClick: jest.fn(),
  serviceList: SERVICE_LIST,
};

const component = (
  <AppProvider>
    <ThemeProvider>
      <PureMain {...props} />
    </ThemeProvider>
  </AppProvider>
);

describe('[Main] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Main] Interaction', () => {
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });
  afterEach(cleanup);

  it('simulate [onAddService] is called when corresponding button is clicked', () => {
    const addServiceButton = renderResult.getByTestId('addServiceButton');
    fireEvent.click(addServiceButton);
    expect(props.onAddServiceClick).toHaveBeenCalled();
  });
});

describe('[Main] Interaction with ServiceList on first page', () => {
  let renderResult;
  const serviceListOnFirstPage = SERVICE_LIST.slice(0, NUMBER_OF_ITEMS_ON_PAGE);

  beforeEach(() => {
    renderResult = render(component);
  });
  afterEach(cleanup);

  it('simulate [onUpdateService] with desired [service id] as parameter is called when corresponding buttons is clicked', () => {
    serviceListOnFirstPage.map((service, index) => {
      const chosenServiceId = service.id;
      const updateServiceButton = renderResult.getByTestId(
        `updateServiceButton-${chosenServiceId}`,
      );
      fireEvent.click(updateServiceButton);
      expect(props.onUpdateServiceClick.mock.calls[index][0].id).toBe(
        chosenServiceId,
      );
    });
  });

  it('simulate [onDeleteService] with desired [service id] as parameter is called when corresponding buttons is clicked', () => {
    serviceListOnFirstPage.map((service, index) => {
      const chosenServiceId = service.id;
      const deleteServiceButton = renderResult.getByTestId(
        `deleteServiceButton-${chosenServiceId}`,
      );
      fireEvent.click(deleteServiceButton);
      expect(props.onDeleteServiceClick.mock.calls[index][0]).toBe(
        chosenServiceId,
      );
    });
  });
});

describe('simulate [onServiceClick] with corresponding [service id]. and it should fire when clicking its specific children cells', () => {
  let renderResult;
  const serviceListOnFirstPage = SERVICE_LIST.slice(0, NUMBER_OF_ITEMS_ON_PAGE);

  beforeEach(() => {
    renderResult = render(component);
    props.onServiceClick.mockClear();
  });
  afterEach(cleanup);

  it('simulate clicking desired children cells call [onServiceClick]', () => {
    const testIdPrefixes = Object.values(TEST_ID_OF_CELL)
      .filter(({ clickBehavior }) => clickBehavior === 'onServiceClick')
      .map((cell) => cell.prefix);
    let callCount = 0;
    serviceListOnFirstPage.map(({ id }) => {
      testIdPrefixes.map((prefix) => {
        const cell = renderResult.getByTestId(`${prefix}${id}`);
        fireEvent.click(cell);
        expect(props.onServiceClick.mock.calls[callCount++][0]).toBe(id);
      });
    });
  });

  it("simulate clicking control cell doesn't call any clickHandlers", () => {
    const testIdPrefixes = Object.values(TEST_ID_OF_CELL)
      .filter(({ clickBehavior }) => clickBehavior === 'none')
      .map((cell) => cell.prefix);
    serviceListOnFirstPage.map(({ id }) => {
      testIdPrefixes.map((prefix) => {
        const cell = renderResult.getByTestId(`${prefix}${id}`);
        fireEvent.click(cell);
        expect(props.onServiceClick).toHaveBeenCalledTimes(0);
      });
    });
  });
});
