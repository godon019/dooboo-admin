import React from 'react';
import renderer from 'react-test-renderer';

import Select from '../Select';
import { render, fireEvent } from '@testing-library/react';

let props: any;

props = {
  value: 'red',
  name: 'color',
  options: [{ value: 'red', label: '빨강' }, { value: 'yellow', label: '노랑' }],
  onClick: jest.fn(),
};

let rendered;
let utils;

beforeAll(() => {
  rendered = renderer.create(<Select {...props} />).toJSON();
  utils = render(<Select {...props} />);
});

describe('[Select] render', () => {
  it('renders without crashing', () => {
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should show matching label to value', () => {
    utils.getByDisplayValue('빨강');
  });
});

describe('[Select] interactions', () => {
  it('should show dropdown list when input is clicked', () => {
    const input = utils.getByDisplayValue('빨강');
    fireEvent.click(input);
    utils.getByText('노랑');
  });

  it('should show the clicked option label when option is clicked', () => {
    const menu = utils.getByText('노랑');
    fireEvent.click(menu);
    utils.getByDisplayValue('노랑');
  });
});
