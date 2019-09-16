import styled, { CSSProp } from 'styled-components';

import { LabelSize } from '../../utils/Styles';
import React from 'react';

interface CellProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  labelCss?: CSSProp;
  errors: any;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
const LabelAndContent = styled.div`
  display: flex;
  align-items: center;
`;

const LabelSpan = styled.label<{ labelCss: CSSProp }>`
  ${LabelSize}
  font-size: 14px;
  text-align: left;
  ${(props) => props.labelCss};
  color: ${(props) => props.theme.fontColor};
`;

const Error = styled.div`
  align-self: center;
  margin-top: 0.1em;
  /* margin-left: 12em; */
  color: red;
  font-size: 0.8em;
`;

const Cell: React.FC<CellProps> = ({
  label,
  children,
  htmlFor,
  labelCss,
  errors,
  ...rest
}) => {
  return (
    <Container>
      <LabelAndContent {...rest}>
        <LabelSpan htmlFor={htmlFor} labelCss={labelCss}>
          {label}
        </LabelSpan>
        {children}
      </LabelAndContent>
      {/* <Error>{'what'}</Error> */}
      {errors && errors[htmlFor] && <Error>{errors[htmlFor]}</Error>}
    </Container>
  );
};

export default Cell;
