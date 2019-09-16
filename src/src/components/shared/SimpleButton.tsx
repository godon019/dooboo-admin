import styled from 'styled-components';

const SimpleButton = styled.button`
  padding: 0.3em 0.5em;
  margin: 0.2em;
  font-size: 0.9em;
  border-radius: 7px;
  white-space: nowrap;
  transition: all .1s ease-in-out;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default SimpleButton;
