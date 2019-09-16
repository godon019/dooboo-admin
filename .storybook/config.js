//global css
import '../dist/styles.css';

import {
  ApolloProviderDecorator,
  AppProviderDecorator,
  AuthProviderDecorator,
  LoadingProviderDeco,
  LoggerProviderDeco,
  RouteProviderDecorator,
} from './decorators';

import { addDecorator } from '@storybook/react';
import { configure } from '@storybook/react';
import { theme } from '../src/theme';
import { withKnobs } from '@storybook/addon-knobs';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);
// const req = require.context(
//   '../src',
//   true,
//   /(SignIn\/index|ServiceDetail\/index|SubsModal).stories\.tsx$/,
// );

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

//global decorators
addDecorator(withKnobs);
addDecorator(RouteProviderDecorator);
addDecorator(LoadingProviderDeco);
addDecorator(LoggerProviderDeco);
addDecorator(withThemesProvider([theme.light, theme.dark]));
addDecorator(AuthProviderDecorator);
addDecorator(ApolloProviderDecorator);
addDecorator(AppProviderDecorator);
