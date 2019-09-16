import React, { Component, useState } from 'react';

import { Formik } from 'formik';
import SignInForm from './form';
import Title from '../../shared/Title';
import { WhenNarrow } from '../../../utils/Styles';
import { WithSignInApollo } from './WithApollo';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 35%;
  ${WhenNarrow} {
    padding: 0 10%;
  }
`;
const TitleText = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-bottom: 1.5rem;
`;
const DividerHorizontal = styled.hr`
  margin-top: 2rem;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5em;
  width: 100%;
`;
const Anchor = styled.a`
  margin: 0 1rem;
  font-size: 1rem;
  text-decoration: none;
  color: ${(props) => props.theme.btnPrimaryLightFont};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.btnPrimary};
  }
`;
const DividerVertical = styled.span`
  color: #cccccc;
`;

interface SubmitValues {
  email: string;
  password: string;
}
export interface SignInProps {
  history?: any;
  onSubmitSuccess?: (SubmitValues) => void; // test purpose
  onSignUpClick?: () => void;
}

function SignIn(props: SignInProps) {
  return (
    <ContentWrapper>
      <TitleText>{getString('ADMIN_LOGIN')}</TitleText>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          let errors: { email?: string; password?: string } = {};

          // email validation
          if (!values.email) {
            errors.email = getString('EMAIL_HINT');
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = getString('EMAIL_ERROR');
          }

          // password validation
          if (!values.password) {
            errors.password = getString('PASSWORD_HINT');
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (props.onSubmitSuccess) {
            props.onSubmitSuccess(values);
          }
          setSubmitting(false);
        }}
        component={(props) => <SignInForm {...props} />}
      />
      <DividerHorizontal />
      <Row>
        <Anchor onClick={props.onSignUpClick}>{getString('SIGNUP')}</Anchor>
        {/* <DividerVertical>{` | `}</DividerVertical> */}
        {/* <Anchor href='#'>{getString('PASSWORD_FIND')}</Anchor> */}
      </Row>
    </ContentWrapper>
  );
}
export { SignIn as PureSignIn };
export default WithSignInApollo(SignIn);
