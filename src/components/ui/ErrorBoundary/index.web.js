import React, {useCallback, useEffect} from 'react';
import * as Sentry from '@sentry/react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';

const ErrorBoundary = ({children}) => {
  useEffect(() => {
    const splash = document.getElementById('splash');
    splash.style.display = 'none';
  }, []);

  const renderFallback = useCallback(<Fallback>Error</Fallback>, []);

  return (
    <Sentry.ErrorBoundary fallback={renderFallback} showDialog>
      {children}
    </Sentry.ErrorBoundary>
  );
};
export default ErrorBoundary;

const Fallback = styled(AppText)`
  font-size: 40px;
  color: red;
`;
