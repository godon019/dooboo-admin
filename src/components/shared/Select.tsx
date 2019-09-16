import { IC_ARROW_DROP_DOWN, IC_ARROW_DROP_UP } from '../../utils/Icons';
import React, { useEffect, useState } from 'react';
import { find, map } from 'lodash';
import styled, { css } from 'styled-components';

interface SelectProps {
  value: any;
  name: string;
  options: Option[];
  onClick: (value: any) => void;
}

interface Option {
  value: any;
  label: string;
}

const ContainerDiv = styled.div`
  width: 100%;
  position: relative;
`;

const DropDownDiv = styled.div`
  position: absolute;
  z-index: 3;
  left: 0;
  top: 70px;
  background-color: white;
  width: 100%;
  border: 1px solid #dee2e6;
  box-sizing: border-box;
`;

const MenuDiv = styled.div`
  border-bottom: 1px solid #dee2e6;
  text-align: left;
  padding: 8px;
  font-size: 12px;
  box-sizing: border-box;
  &:hover {
    background-color: #dee2e6;
    cursor: pointer;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  padding-left: 8px;
  font-size: 14px;
  color: #212529;
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  border: 1px solid #dee2e6;
  background-color: white;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
`;

const Select: React.FC<
  SelectProps & React.HTMLAttributes<HTMLInputElement>
> = ({ value, name, options, onClick }) => {
  const [selectedOption, setSelectedOption] = useState<Option>(
    () =>
      find(options, (option) => option.value === value) || {
        value: null,
        label: 'select...',
      },
  );
  const [isVisibleDropdown, setVisibleDropdown] = useState(false);

  useEffect(() => {
    setSelectedOption(
      find(options, (option) => option.value === value) || {
        value: null,
        label: 'select...',
      },
    );
  }, [value, options]);

  const onClickInput = () => {
    setVisibleDropdown((prev) => !prev);
  };

  const onClickMenu = (option: Option) => {
    setSelectedOption(option);
    setVisibleDropdown(false);
    onClick(option.value);
  };

  return (
    <ContainerDiv>
      <InputWrapper onClick={onClickInput}>
        <Input
          type='text'
          readOnly={true}
          value={selectedOption.label}
          name={name}
        />
        {isVisibleDropdown ? (
          <img src={IC_ARROW_DROP_UP} alt='윗 화살표' />
        ) : (
          <img src={IC_ARROW_DROP_DOWN} alt='아랫 화살표' />
        )}
      </InputWrapper>
      {isVisibleDropdown && (
        <DropDownDiv>
          {map(options, (option) => (
            <MenuDiv key={option.value} onClick={() => onClickMenu(option)}>
              {option.label}
            </MenuDiv>
          ))}
        </DropDownDiv>
      )}
    </ContainerDiv>
  );
};

export default Select;
