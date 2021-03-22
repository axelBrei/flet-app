import React from 'react';
import styled from 'styled-components';

export default ({children}) => {
  return <Container>{children}</Container>;
};

export const useBodyLock = () => ({
  lockBody: () => {},
  unlockBody: () => {},
});

const Container = styled.View`
  flex: 1;
`;
