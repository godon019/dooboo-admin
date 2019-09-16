import * as renderer from 'react-test-renderer';

import Button from '../Button';
import { IC_FACEBOOK_W } from '../../../utils/Icons';
import React from 'react';
import ThemeProvider from '../../../providers/ThemeProvider';

// test for the pure component
describe('[Button] shared component test', () => {
  let tree: any;
  const component: any = (
    <ThemeProvider>
      <Button inverted={true} text='Button 2nd test' />
    </ThemeProvider>
  );

  it('component and snapshot matches', () => {
    tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[Transparent] interaction', () => {
  let count = 1;
  const onClick = () => {
    count++;
  };

  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  const component: any = (
    <ThemeProvider>
      <Button onClick={onClick} />
    </ThemeProvider>
  );

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
  });

  it('Simulate onClick', () => {
    const button = root.find((el: any) => el.type === 'button');
    button.props.onClick();
    expect(count).toBe(2);
  });
});

describe('[WhiteButton] interaction', () => {
  let count = 1;
  const onClick = () => {
    count++;
  };

  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let component: any;

  it('should simulate onClick', () => {
    component = (
      <ThemeProvider>
        <Button inverted={true} onClick={onClick} />
      </ThemeProvider>
    );
    rendered = renderer.create(component);
    root = rendered.root;

    const button = root.find((el: any) => el.type === 'button');
    button.props.onClick();
    expect(count).toBe(2);
  });

  it('should render isLoading status', () => {
    component = (
      <ThemeProvider>
        <Button inverted={true} isLoading={true} />
      </ThemeProvider>
    );
    rendered = renderer.create(component);
    root = rendered.root;
  });

  it('should render img status', () => {
    component = (
      <ThemeProvider>
        <Button inverted={true} imgSrc={IC_FACEBOOK_W} />
      </ThemeProvider>
    );
    rendered = renderer.create(component);
    root = rendered.root;
  });
});
