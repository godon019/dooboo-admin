import { fireEvent, getByTestId, render } from '@testing-library/react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import ImgFileInput from '../ImgFileInput';
import React from 'react';
import ThemeProvider from '../../../providers/ThemeProvider';

let props: any;
let component: React.ReactElement;
let testingLib: any;

describe('[ImgFileInput] render', () => {
  beforeEach(() => {
    props = {
      history: {
        goBack: jest.fn(),
      },
    };
    component = (
      <ThemeProvider>
        <ImgFileInput name={'imgfile-name'} id={'imgfile-id'} />
      </ThemeProvider>
    );
  });

  it('renders without crashing', () => {
    const rendered: ReactTestRendererJSON = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onClick', () => {
      // fireEvent(testingLib.getByTestId('btn'), 'click');
      // expect(cnt).toBe(2);
    });
  });
});
