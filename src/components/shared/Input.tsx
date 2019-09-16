import styled, { CSSProp } from 'styled-components';

import React from 'react';

interface InputProps {
  name: string;
  type: string;
  unit?: string;
  value?: any;
  readOnly?: boolean;
  customCss?: CSSProp;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #d9d9da;
`;

const CustomInput = styled.input<{ addCSS: CSSProp }>`
  width: 100%;
  /* To fix UI abmormality, commented this */
  /* height: 60px; */
  padding: 1rem 0.8rem;
  font-size: 1rem;
  color: ${(props) => (props.readOnly ? 'grey' : '#000000')};
  ${(props) => props.addCSS};
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgb(215, 216, 217);
    font-size: 14px;
  }
`;

const UnitSpan = styled.span`
  text-align: center;
  line-height: 60px;
  height: 60px;
  padding: 0 15px;
`;

const Input: React.FC<InputProps & React.HTMLAttributes<HTMLInputElement>> = ({
  name,
  type,
  readOnly,
  value,
  customCss,
  unit,
  ...otherProps
}) => {
  return (
    <Container>
      <CustomInput
        name={name}
        type={type}
        readOnly={readOnly}
        value={value}
        addCSS={customCss}
        {...otherProps}
      />
      {unit ? <UnitSpan>{unit}</UnitSpan> : null}
    </Container>
  );
};

export default Input;
