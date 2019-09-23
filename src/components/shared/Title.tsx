import React, { Component } from 'react';

import styled from 'styled-components';

const AdminTitle = styled.div`
  /* margin-bottom: 3rem; */
`;
const LogoImgArea = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.2rem;
`;
const TitleDesc = styled.span<{ larger: boolean }>`
  font-size: ${(props) => (props.larger ? '1.5rem' : '.8rem')};
  padding: 0 0.3rem;
  color: #cbcccf;
`;
const LogoImg = styled.img<{ larger: boolean }>`
  :hover {
    cursor: pointer;
  }
  width: ${(props) => (props.larger ? '9rem' : '5rem')};
  height: auto;
`;
const Text = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

type TitleProps = {
  text?: string;
  src?: any;
  larger?: boolean;
  onLogoClick?: () => void;
};

const Title: React.FC<TitleProps> = ({
  text,
  src = 'https://dooboolab.com/8a19465015cf5126862d9e850962f835.png',
  larger,
  onLogoClick,
}) => {
  return (
    <AdminTitle>
      <LogoImgArea>
        <LogoImg src={src} larger={larger} onClick={onLogoClick} />
        <TitleDesc larger={larger}>{`| Admin`}</TitleDesc>
      </LogoImgArea>
      <Text>{text}</Text>
    </AdminTitle>
  );
};

export default Title;
