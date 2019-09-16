import React, { useContext } from 'react';
import { ThemeType, createTheme } from '../theme';

import { AppContext } from '../contexts';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';

interface Props {
  children?: any;
}
const ThemeProvider = (props: Props) => {
  const fromAppProvider = useContext(AppContext);
  /**
   * StyledComponentThemeProvider is normally used with AppProvider as its parent
   * and get `theme` value from AppProvider
   * if AppProvider doesn't exist
   * then use ThemeType.LIGHT as default `theme`
   */
  const theme = fromAppProvider ? fromAppProvider.state.theme : ThemeType.LIGHT;
  return (
    <StyledComponentThemeProvider theme={createTheme(theme)}>
      {props.children}
    </StyledComponentThemeProvider>
  );
};

export default ThemeProvider;
