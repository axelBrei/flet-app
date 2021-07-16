import React, {useCallback, useEffect} from 'react';
import * as Sentry from '@sentry/react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

const ErrorBoundary = ({children}) => {
  useEffect(() => {
    const splash = document.getElementById('splash');
    splash.style.display = 'none';
  }, []);

  const renderFallback = useCallback(<Fallback>Error</Fallback>, []);
  const Container =
    process.env.NODE_ENV === 'development'
      ? props => <React.Fragment>{props.children}</React.Fragment>
      : Sentry.ErrorBoundary;

  return (
    <Container fallback={renderFallback} showDialog>
      {children}
    </Container>
  );
};
export default ErrorBoundary;

const Fallback = styled(AppText)`
  font-size: 40px;
  color: red;
  background-color: ${theme.backgroundColor};
`;
