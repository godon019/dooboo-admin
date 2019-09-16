import React, { Component, useContext, useState } from 'react';

import { AuthContext } from '../../../providers/AuthProvider';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../../utils/Constants';
import { RouteContext } from '../../../providers/RouteProvider';
import Title from '../../shared/Title';
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

const Header = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  /* background-color: red; */
`;

const CNavLink = styled(NavLink)`
  color: #8b8c8c;
  text-decoration: none;
  margin-right: 1em;
  font-size: 0.8em;
  /* border-bottom: 1px solid #407fff; */
`;

const activeStyle = {
  fontWeight: 'bold',
  color: '#407fff',
  borderBottom: '1px solid #407fff',
} as React.CSSProperties;
const Frame: React.FC = (props) => {
  const { route } = useContext(RouteContext);
  const { isSignedIn } = useContext(AuthContext);
  return (
    <Container>
      <Title
        onLogoClick={() => {
          route.history.push(ROUTE.main);
        }}
        src={
          'https://github.com/whatssub/whatssub-mobile/blob/master/assets/splash.gif?raw=true'
        }
        larger
      />
      <Header>
        {isSignedIn ? (
          <>
            <CNavLink to={ROUTE.main} activeStyle={activeStyle}>
              서비스
            </CNavLink>
            <CNavLink to={ROUTE.serviceGroup} activeStyle={activeStyle}>
              서비스그룹
            </CNavLink>
            <CNavLink to={ROUTE.category} activeStyle={activeStyle}>
              카테고리
            </CNavLink>
          </>
        ) : (
          <CNavLink to={ROUTE.signIn} activeStyle={activeStyle}>
            로그인
          </CNavLink>
        )}
      </Header>

      {props.children}
    </Container>
  );
};
export { Frame };
