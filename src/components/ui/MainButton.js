import React, {useCallback, useMemo, useRef} from 'react';
import {Platform, TouchableOpacity, Animated, View} from 'react-native';
import {theme} from 'constants/theme';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Icon} from 'components/ui/Icon';
import Hoverable from 'components/ui/Hoverable/index';

const MainButtonAux = ({
  label,
  leftIcon,
  rightIcon,
  onPress,
  inverted,
  alternative,
  fontSize,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const buttonColors = useMemo(() => {
    if (inverted) {
      return {
        color: theme.accentColor,
        backgroundColor: theme.white,
        borderWidth: scaleDp(1),
        borderColor: theme.accentColor,
      };
    }
    if (alternative) {
      return {
        color: theme.white,
        backgroundColor: theme.primaryDarkColor,
      };
    }
  }, [inverted, alternative]);

  const showIconOrBlankSpace = useCallback(
    (iconName) =>
      !!iconName ? (
        <Icon
          color={buttonColors?.color || props.iconColor || theme.fontColor}
          name={iconName}
          size={Platform.OS === 'web' ? 30 : 25}
        />
      ) : (
        <View style={{width: Platform.OS === 'web' ? 30 : 25}} />
      ),
    [],
  );

  const handleHover = useCallback(
    (toValue = 1) =>
      Animated.timing(scale, {
        toValue,
        duration: 150,
        useNativeDriver: true,
      }).start,
    [],
  );

  return (
    <Hoverable onHoverIn={handleHover(1.05)} onHoverOut={handleHover()}>
      <Button
        onPress={onPress}
        classname={props.classname}
        backgroundColor={buttonColors?.backgroundColor}
        borderColor={buttonColors?.borderColor}
        style={[
          props.style,
          {
            transform: [{scale}],
          },
        ]}
        {...props}>
        <Container>
          {showIconOrBlankSpace(leftIcon)}
          <Text fontSize={fontSize} color={buttonColors?.color}>
            {label}
          </Text>
          {showIconOrBlankSpace(rightIcon)}
        </Container>
      </Button>
    </Hoverable>
  );
};

MainButtonAux.defaultProps = {
  label: '',
  fontSize: Platform.OS === 'web' ? 12 : 16,
  leftIcon: '',
  rightIcon: '',
  onPress: () => {},
  inverted: false,
  alternative: false,
};
export const MainButton = MainButtonAux;

const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled(AppText)`
  text-align: center;
  color: ${(props) => props.color || props.theme.colors.fontColor};
  padding: 0 ${scaleDpTheme(5)};
`;

const RawButton = styled(TouchableOpacity)`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.primaryColor};
  border-color: ${(props) =>
    props.borderColor || props.theme.colors.primaryColor};
  border-width: ${(props) => (props.borderColor ? 1 : 0)}px;
  margin: ${(props) => scaleDp(5)}px;
  width: ${(props) => scaleDpTheme(props.width || 200)};
  height: ${(props) => scaleDp(props.height || 40)}px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
const Button = Animated.createAnimatedComponent(RawButton);
