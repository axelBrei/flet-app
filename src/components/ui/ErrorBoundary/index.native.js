import React, {useCallback} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import crashlytics from '@react-native-firebase/crashlytics';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastError: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    crashlytics().recordError(error);
    console.log('static error:', error);
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }
  // renderFallback = useCallback(<Fallback>Error</Fallback>, []);

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('error catch', error);
    this.setState({hasError: true});
  }

  render() {
    const {children} = this.props;
    const {hasError} = this.state;

    if (hasError) {
      return <Fallback>Error</Fallback>;
    }
    return children;
  }
}
export default ErrorBoundary;

const Fallback = styled(AppText)`
  font-size: 40px;
  color: red;
`;
