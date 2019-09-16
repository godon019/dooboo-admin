import { ButtonPrimary, ButtonPrimaryLight } from '../ui/Buttons';
import React, { ButtonHTMLAttributes, useContext } from 'react';
import styled, { CSSProp, ThemeContext } from 'styled-components';

interface ButtonProps {
  id?: string;
  inverted?: boolean;
  outline?: boolean;
  imgSrc?: any;
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;
  customStyle?: object;
  customTextStyle?: object;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

const PrimaryTextLight = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.btnPrimaryLightFont};
`;

const PrimaryText = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.btnPrimaryFont};
`;

const LogoImg = styled.img`
  position: absolute;
  left: 16px;
  height: 20px;
  width: 20px;
  object-fit: cover;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * @param customStyle
 * @example { 'border-color': 'orange', 'border-width': '3.21rem' }
 */
const Button: React.FC<ButtonProps> = ({
  id,
  inverted,
  outline,
  imgSrc,
  text,
  onClick,
  isLoading,
  customStyle = {},
  customTextStyle = {},
  type,
  ...otherProps
}) => {
  const themeContext = useContext(ThemeContext);
  const defaultStyle = { height: '60px' };
  const outlineBorderStyle = {
    borderColor: themeContext.btnPrimary,
    backgroundColor: '#fff',
  };
  let outlineTextStyle = {
    color: themeContext.btnPrimary,
  };
  let borderStyle = outline
    ? { ...customStyle, ...outlineBorderStyle }
    : customStyle;
  let textStyle = outline
    ? { ...customTextStyle, ...outlineTextStyle }
    : customTextStyle;
  let btnBorderStyle = {
    ...defaultStyle,
    ...borderStyle,
  };
  let btnType = type || 'button';
  if (inverted) {
    return (
      <ButtonPrimaryLight
        style={btnBorderStyle}
        onClick={onClick}
        type={btnType}
        {...otherProps}
      >
        {isLoading ? (
          <Spinner id='spinner' />
        ) : (
          <div>
            {imgSrc ? <LogoImg src={imgSrc} /> : null}
            <PrimaryTextLight style={textStyle}>{text}</PrimaryTextLight>
          </div>
        )}
      </ButtonPrimaryLight>
    );
  }
  return (
    <ButtonPrimary
      style={btnBorderStyle}
      onClick={onClick}
      type={btnType}
      {...otherProps}
    >
      {isLoading ? (
        <Spinner id='spinner' />
      ) : (
        <div>
          {imgSrc ? <LogoImg src={imgSrc} /> : null}
          <PrimaryText style={textStyle}>{text}</PrimaryText>
        </div>
      )}
    </ButtonPrimary>
  );
};

export default Button;
