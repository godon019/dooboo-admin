import { AdminSignUp, AdminSignUpForm } from '../../../types';
import React, { Component, useState } from 'react';

import { Formik } from 'formik';
import SignInForm from './form';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 35%;
`;
const TitleText = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-bottom: 1.5rem;
`;

export interface SignUpProps {
  onSubmitSuccess: (submitValues: AdminSignUp) => void; // test purpose
}

const SignUp: React.FC<SignUpProps> = (props) => {
  return (
    <ContentWrapper>
      <TitleText>{getString('SIGNUP')}</TitleText>
      <Formik<AdminSignUpForm>
        initialValues={{
          email: '',
          name: '',
          password: '',
          passwordConfirm: '',
        }}
        validate={(values) => {
          const errors: {
            email?: string;
            name?: string;
            password?: string;
            passwordConfirm?: string;
          } = {};

          // email validation
          if (!values.email) {
            errors.email = getString('EMAIL_HINT');
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = getString('EMAIL_ERROR');
          }

          if (!values.name) {
            errors.name = '이름을 입력해 주세요';
          }

          // password validation
          if (!values.password) {
            errors.password = getString('PASSWORD_HINT');
          }
          // password_confirm validation
          if (!values.passwordConfirm) {
            errors.passwordConfirm = getString('PASSWORD_HINT');
          }
          if (
            values.password &&
            values.passwordConfirm &&
            values.password !== values.passwordConfirm
          ) {
            errors.password = getString('PASSWORD_NOT_MATCH');
            errors.passwordConfirm = getString('PASSWORD_NOT_MATCH');
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
    </ContentWrapper>
  );
};
export default SignUp;
