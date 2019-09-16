import React from 'react';
import renderer from 'react-test-renderer';

import Cell from '../Cell';
import { render } from '@testing-library/react';

let props: any;

props = {
  label: 'name',
};

let rendered;
let utils;

beforeAll(() => {
  rendered = renderer.create(<Cell {...props}>nick</Cell>).toJSON();
  utils = render(<Cell {...props}>nick</Cell>);
});

describe('[Cell] render', () => {
  it('renders without crashing', () => {
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should should children element', () => {
    utils.getByText('nick');
  });
});
