import React, { FC } from 'react';
import styled, { CSSProp } from 'styled-components';

import OutsideClickHandler from 'react-outside-click-handler';

const DimmerDiv = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(33, 37, 41, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalDiv = styled.div<{ addCSS: CSSProp }>`
  /* width: 100px; */
  padding: 2em;
  height: 90vh;
  overflow: scroll;
  background-color: white;
  box-sizing: border-box;
  border-radius: 5px;
  ${(props) => props.addCSS};
`;

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
  customModalCss?: CSSProp;
}

const Modal: FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  customModalCss,
  isDisabled = false,
}) => {
  const onOutsideClick = () => {
    onClose();
  };

  return (
    <>
      {isVisible && (
        <DimmerDiv>
          <OutsideClickHandler
            onOutsideClick={onOutsideClick}
            disabled={isDisabled}
          >
            <ModalDiv addCSS={customModalCss} data-testid={'modal'}>
              {children}
            </ModalDiv>
          </OutsideClickHandler>
        </DimmerDiv>
      )}
    </>
  );
};

export default Modal;
