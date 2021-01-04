import React from 'react';
import styled, {css} from 'styled-components';
import {ActivityIndicator, View, Platform} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';

export const Loader = ({children, unmount, message, loading}) => {
  const renderLoader = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'large' : scaleDp(50)}
        animating
        color={theme.primaryColor}
      />
      {message && <Message>{message}</Message>}
    </View>
  );

  if (loading && unmount) {
    return <LoaderContainer>{renderLoader()}</LoaderContainer>;
  }
  return (
    <>
      {!unmount && loading && (
        <LoaderContainer unmount>{renderLoader()}</LoaderContainer>
      )}
      {children}
    </>
  );
};

Loader.defaultProps = {
  loading: false,
  unmount: true, // unmount children while loading
};

const LoaderContainer = styled(Container)`
  height: ${(props) => props.theme.screenHeight}px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${theme.backgroundColor};
  ${(props) =>
    props.unmount &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    `}
`;

const Message = styled(AppText)`
  font-size: ${scaleDpTheme(15)};
  margin: ${scaleDpTheme(7)};
  text-align: center;
`;
