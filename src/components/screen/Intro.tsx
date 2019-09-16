import {
  AppConsumer,
  AppContext,
  AppProvider as Provider,
} from '../../providers';
import { IC_FACEBOOK_W, IC_GOOGLE_W } from '../../utils/Icons';
import React, { Component, useState } from 'react';
import { ThemeType, device } from '../../theme';

import Button from '../shared/Button';
import { IUser } from '../../types';
import Modal from '../shared/Modal';
import { Redirect } from 'react-router-dom';
import { SUBS_LIST } from './ServiceDetail/mock';
import SubsModal from '../ui/SubsModal/SubsModal';
import { getString } from '../../../STRINGS';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-self: stretch;
  overflow: scroll;
  background: ${(props) => props.theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.mobileS} {
    max-width: 768px;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
  }

  @media ${device.tablet} {
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 400px;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  flex-direction: column;

  @media ${device.mobileS} {
    bottom: 40px;
    width: 85vw;
    align-self: center;
  }

  @media ${device.tablet} {
    width: 50vw;
    right: 60px;
    align-self: center;
    top: 400px;
  }
`;

const Text = styled.span`
  font-size: 18px;
  line-height: 1.5;
  font-family: sans-serif;
  color: ${(props) => props.theme.fontColor};
`;

interface IProps {
  history: any;
  store?: any;
}

function Intro(props: IProps) {
  const { state, dispatch } = React.useContext(AppContext);
  const navigate = (pathname: string) => {
    const location: object = {
      pathname,
      state: {},
    };
    props.history.push(location);
  };

  return (
    <Container>
      <ContentWrapper>
        <Text>{state.user.displayName}</Text>
        <Text>{state.user.age ? state.user.age : ''}</Text>
        <Text>{state.user.job}</Text>
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => navigate('/signup')}
          inverted={true}
          text={getString('SIGN_UP_SCREEN')}
        />
        <Button
          onClick={() => navigate('/signin')}
          inverted={true}
          text={getString('SIGN_IN_SCREEN')}
        />
        <Button
          onClick={() => navigate('/main')}
          inverted={true}
          text={getString('MAIN_SCREEN')}
        />
        <Button
          onClick={() => navigate('/404')}
          inverted={true}
          text={getString('NAVIGATE')}
        />
      </ButtonWrapper>
    </Container>
  );
}

export default Intro;
