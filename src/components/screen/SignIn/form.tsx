import React, { Component, useState } from 'react';

import Button from '../../shared/Button';
import Input from '../../shared/Input';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';

const WhenNarrow = `
  @media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px)
`;
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

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 0.3em 0.5em;
  font-size: 0.9em;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.7em;
`;

const SignInForm = ({
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
        <ErrorMessage data-testid='error'>{errors.email}</ErrorMessage>
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
        <ErrorMessage>{errors.password}</ErrorMessage>
      )}
    </Row>
    <Button
      type='submit'
      text={getString('LOGIN')}
      data-testid='submit'
      disabled={isSubmitting}
    />
  </Form>
);
export default SignInForm;
