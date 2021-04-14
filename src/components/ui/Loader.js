import React from 'react';
import styled, {css} from 'styled-components';
import {ActivityIndicator, View, Platform} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import PropTypes from 'prop-types';

export const Loader = ({
  children,
  unmount,
  message,
  loading,
  size,
  ...props
}) => {
  const renderLoader = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={size} animating color={theme.primaryColor} />
      {message && <Message>{message}</Message>}
    </View>
  );

  if (unmount) {
    return loading ? (
      <ComponentContainer style={props.style}>
        {renderLoader()}
      </ComponentContainer>
    ) : (
      children
    );
  }
  return (
    <>
      {children}
      {loading && (
        <FloatingContainer style={props.style}>
          <LoaderContainer unmount={unmount}>{renderLoader()}</LoaderContainer>
        </FloatingContainer>
      )}
    </>
  );
};

Loader.defaultProps = {
  loading: false,
  size: 'small',
  unmount: true, // unmount children while loading,
};
Loader.propTypes = {
  size: PropTypes.string,
  unmount: PropTypes.bool,
  loading: PropTypes.bool,
  message: PropTypes.string,
};

const ComponentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${props =>
    props.unmount &&
    css`
      height: ${({theme}) => theme.screenHeight}px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    `}
`;

const FloatingContainer = styled.View`
  position: absolute;
  background-color: ${theme.backgroundColor};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  width: auto;
  z-index: 100;
`;

const Message = styled(AppText)`
  font-size: 16px;
  margin: 10px 0;
  text-align: center;
  font-weight: bold;
`;
