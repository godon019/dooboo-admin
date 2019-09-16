import styled, { keyframes } from 'styled-components';

import React from 'react';

const Overlay = styled.div`
  position: fixed; /* Sit on top of the page content */
  display: ${({ show }: { show: boolean }) =>
    show ? 'block' : 'none'}; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); /* Black background with opacity */
  z-index: 999; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  /* center */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  /* Spinner */
  display: inline-block;
  width: 64px;
  height: 64px;
  ::after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;
const Debug = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  justify-content: center;
  align-items: center;
  color: #407fff;
`;
const Item = styled.div`
  background-color: #ffffffee;
  padding: 0.2em;
`;

export const LoadingOverlay = ({
  show,
  fetchingStatusObj,
}: {
  show: boolean;
  fetchingStatusObj?: object;
}) => {
  return (
    <Overlay show={show}>
      <Debug>
        <Item>┌─ Loading Status ─┐</Item>
        {Object.entries(fetchingStatusObj)
          .filter(([key, value]) => value)
          .map(([key, value]) => (
            <Item key={key}>{key}</Item>
          ))}
        <Item>└─────────┘</Item>
        {/* {JSON.stringify(fetchingStatusObj, null, 2)} */}
      </Debug>
      <Spinner />
    </Overlay>
  );
};
