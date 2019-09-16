import { AdminSignUp, AdminSignUpForm } from '../../../types';
import React, { Component, useState } from 'react';

import Button from '../../shared/Button';
import { FormikProps } from 'formik';
import Input from '../../shared/Input';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5em;
`;
const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.7em;
`;

const SignInForm: React.FC<
  React.PropsWithChildren<FormikProps<AdminSignUpForm>>
> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Label htmlFor='email'>{getString('EMAIL') + ':'}</Label>
      <Input
        type='email'
        name='email'
        data-testid='email'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      {errors.email && touched.email && (
        <ErrorMessage data-testid='error-email'>{errors.email}</ErrorMessage>
      )}
    </Row>
    <Row>
      <Label htmlFor='name'>{'이름:'}</Label>
      <Input
        type='name'
        name='name'
        data-testid='name'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      {errors.name && touched.name && (
        <ErrorMessage data-testid='error-name'>{errors.name}</ErrorMessage>
      )}
    </Row>
    <Row>
      <Label>{getString('PASSWORD') + ':'}</Label>
      <Input
        type='password'
        name='password'
        data-testid='password'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      {errors.password && touched.password && (
        <ErrorMessage data-testid='error-password'>
          {errors.password}
        </ErrorMessage>
      )}
    </Row>
    <Row>
      <Label>{getString('PASSWORD_CONFIRM') + ':'}</Label>
      <Input
        type='password'
        name='passwordConfirm'
        data-testid='passwordConfirm'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.passwordConfirm}
      />
      {errors.passwordConfirm && touched.passwordConfirm && (
        <ErrorMessage data-testid='error-passwordConfirm'>
          {errors.passwordConfirm}
        </ErrorMessage>
      )}
    </Row>
    <Button
      type='submit'
      text={getString('SIGNUP')}
      data-testid='submit'
      disabled={isSubmitting}
    />
  </Form>
);
export default SignInForm;
