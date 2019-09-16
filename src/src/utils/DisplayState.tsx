import React, { useContext } from 'react';

import { LoggerContext } from '../providers/LoggerProvider';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 100vw;
  font-size: 13px;
  /* position: absolute; */
`;
export const DisplayState = (props) => {
  const { show } = useContext(LoggerContext);
  return (
    <>
      {show ? (
        <Container style={{ margin: '1rem 0' }}>
          <h3 style={{ fontFamily: 'monospace' }} />
          <pre
            style={{
              background: '#f6f8fa',
              padding: '.5rem',
              textAlign: 'left',
            }}
          >
            <strong>props</strong> = {JSON.stringify(props, null, 2)}
          </pre>
        </Container>
      ) : null}
    </>
  );
};
