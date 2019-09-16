import React, { FC, Component, TextareaHTMLAttributes } from 'react';
import styled, { CSSProp } from 'styled-components';

const CustomTextArea = styled.textarea<{addCSS: CSSProp}>`
  padding: 1rem .8rem;
  font-size: 1rem;
  color: #000000;
  border: 1px solid #D9D9DA;
  ${(props) => props.addCSS};
  &:focus {
    outline: none;
  }
`;

type TextAreaProps = {
  name: string;
  value?: any;
  readOnly?: boolean;
  customCss?: CSSProp;
};

const TextArea: FC<TextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ name, readOnly, value, customCss, ...otherProps }) => {
  return (
    <CustomTextArea name={name} readOnly={readOnly} value={value} addCSS={customCss} {...otherProps}/>
  );
};

export default TextArea;
