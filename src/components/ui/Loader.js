import React from 'react';
import styled, {css} from 'styled-components';
import {ActivityIndicator, View, Platform} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import PropTypes from 'prop-types';

export const Loader = ({
  children,
  onPlace,
  unmount,
  message,
  loading,
  size,
  ...props
}) => {
  const renderLoader = () => (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'large' : scaleDp(size || 50)}
        animating
        color={theme.primaryColor}
      />
      {message && <Message>{message}</Message>}
    </View>
  );

  const Wrapper = onPlace ? View : React.Fragment;
  if (unmount && loading) {
    return <Wrapper>{renderLoader()}</Wrapper>;
  }
  return (
    <Wrapper
      {...(onPlace && {
        style: [props.style],
      })}>
      {loading && (
        <LoaderContainer unmount={unmount}>{renderLoader()}</LoaderContainer>
      )}
      {!loading && children}
    </Wrapper>
  );
};

Loader.defaultProps = {
  loading: false,
  unmount: true, // unmount children while loading,
  onPlace: false, // place loader in same place that children
};
Loader.propTypes = {
  unmount: PropTypes.bool,
  loading: PropTypes.bool,
  onPlace: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

const LoaderContainer = styled(Container)`
  height: 100%;
  align-items: center;
  justify-content: center;
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
