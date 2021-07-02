import React from 'react';
import styled from 'styled-components';
import {theme} from 'constants/theme';

export default ({children}) => {
  return <Container>{children}</Container>;
};

export const useBodyLock = () => ({
  lockBody: () => {},
  unlockBody: () => {},
});

const Container = styled.View`
  flex: 1;
  background-color: ${theme.primaryColor};
`;
