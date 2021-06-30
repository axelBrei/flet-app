import React, {useCallback, useMemo, useRef} from 'react';
import {
  Platform,
  TouchableOpacity,
  Animated,
  View,
  ActivityIndicator,
} from 'react-native';
import {theme} from 'constants/theme';
import styled, {css} from 'styled-components';
import {AppText} from 'components/ui/AppText';
import Hoverable from 'components/ui/Hoverable/index';

const MainButtonAux = ({
  label,
  leftIcon,
  rightIcon,
  onPress,
  inverted,
  alternative,
  fontSize,
  style,
  children,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handleHover = useCallback(
    (toValue = 1) =>
      Animated.timing(scale, {
        toValue,
        duration: 150,
        useNativeDriver: true,
      }).start,
    [],
  );

  if (props.loading) {
    return (
      <View style={[style, {height: 43, justifyContent: 'center'}]}>
        <ActivityIndicator
          animating
          color={props.loaderColor || theme.primaryColor}
        />
      </View>
    );
  }
  return (
    <Hoverable onHoverIn={handleHover(1.05)} onHoverOut={handleHover()}>
      <Button
        onPress={onPress}
        classname={props.classname}
        inverted={inverted}
        style={[style, {transform: [{scale}]}]}
        {...props}>
        <Container>
          <Text
            color={props.color || (inverted ? theme.primaryColor : theme.white)}
            fontSize={fontSize}
            inverted={inverted}
            bold={props.bold}>
            {label || children}
          </Text>
        </Container>
      </Button>
    </Hoverable>
  );
};

MainButtonAux.defaultProps = {
  label: '',
  fontSize: Platform.OS === 'web' ? 13 : 14,
  leftIcon: '',
  rightIcon: '',
  onPress: () => {},
  inverted: false,
  alternative: false,
  bold: true,
};
export const MainButton = MainButtonAux;

const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${props =>
    !props.theme.isMobile &&
    css`
      max-width: 374px;
    `}
`;

const Text = styled(AppText)`
  text-align: center;
  padding: 0 5px;
  font-size: ${props => props.fontSize || 16}px;
`;

const Button = Animated.createAnimatedComponent(
  styled(TouchableOpacity)`
    background-color: ${({inverted}) =>
      inverted ? theme.white : theme.primaryColor};
    border-color: ${theme.primaryColor};
    border-width: ${({inverted}) => (inverted ? '1px' : '0px')};
    margin: 5px;
    padding: 10px 50px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    z-index: 0;

    ${props =>
      !props.theme.isMobile &&
      css`
        max-width: 374px;
      `};
    ${props =>
      props.disabled &&
      css`
        background-color: ${theme.disabledFont};
      `};
  `,
);
