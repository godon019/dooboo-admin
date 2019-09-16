import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Modal from '../Modal';
import { render } from '@testing-library/react';

let props: any;
let component: React.ReactElement;
let testingLib: any;

props = {
  isVisible: true,
  onClose: jest.fn(),
};

describe('[Modal] render', () => {
  it('renders without crashing', () => {
    const rendered: ReactTestRendererJSON = renderer.create(<Modal {...props}/>).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should not render when "isVisible" is false', () => {
    const rendered: ReactTestRendererJSON = renderer.create(<Modal isVisible={false} onClose={props.onClose}/>).toJSON();
    expect(rendered).toBeNull();
  });

  it('should render when "isVisible" is true', () => {
    testingLib = render(<Modal isVisible={true} onClose={props.onClose}/>);
    testingLib.getByTestId('modal');
  });
});
