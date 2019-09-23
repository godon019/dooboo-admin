import React, { Component, useContext, useState } from 'react';

import { AuthContext } from '../../../providers/AuthProvider';
import Header from '../Header/Header';
import { RouteContext } from '../../../providers/RouteProvider';
import { WhenNarrow } from '../../../utils/Styles';
import styled from 'styled-components';

const fontSize = `20px`;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  padding: 3rem;
  box-sizing: border-box;
  ${WhenNarrow} {
    padding: 1rem;
  }
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fontColor};
  font-size: ${fontSize};
`;

const Frame: React.FC = (props) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};
export { Frame };
