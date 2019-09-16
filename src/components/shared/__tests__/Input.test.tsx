import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../Input';
import { render } from '@testing-library/react';

let props: any;

props = {
  name: 'name',
  type: 'text',
};

let rendered;
let utils;

beforeAll(() => {
  rendered = renderer.create(<Input {...props}/>).toJSON();
  utils = render(<Input {...props}/>);
});

describe('[Input] render', () => {
  it('renders without crashing', () => {
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
