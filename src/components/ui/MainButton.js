import React, {useMemo} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {theme} from 'constants/theme';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Icon} from 'components/ui/Icon';

const MainButtonAux = ({
  label,
  icon,
  onPress,
  inverted,
  alternative,
  fontSize,
  ...props
}) => {
  const buttonColors = useMemo(() => {
    if (inverted) {
      return {
        color: theme.primaryColor,
        backgroundColor: theme.white,
        borderWidth: scaleDp(1),
        borderColor: theme.primaryColor,
      };
    }
    if (alternative) {
      return {
        color: theme.white,
        backgroundColor: theme.primaryDarkColor,
      };
    }
  }, [inverted, alternative]);

  return (
    <Button
      onPress={onPress}
      backgroundColor={buttonColors?.backgroundColor}
      borderColor={buttonColors?.borderColor}
      style={props.style}>
      <Container>
        <Text fontSize={fontSize} color={buttonColors?.color}>
          {label}
        </Text>
        {!!icon && (
          <FloatingIcon
            color={buttonColors?.color ?? theme.white}
            name={icon}
            size={Platform.OS === 'web' ? 30 : 25}
          />
        )}
      </Container>
    </Button>
  );
};

MainButtonAux.defaultProps = {
  label: '',
  fontSize: Platform.OS === 'web' ? 12 : 16,
  icon: '',
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
  color: ${(props) => props.color || props.theme.colors.white};
`;

const FloatingIcon = styled(Icon)`
  position: absolute;
  right: ${scaleDpTheme(5)};
`;

const Button = styled(TouchableOpacity)`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.primaryColor};
  border-color: ${(props) =>
    props.borderColor || props.theme.colors.primaryColor};
  border-width: ${(props) => (props.borderColor ? 1 : 0)}px;
  margin: ${(props) => props.theme.scale(5)}px;
  width: ${scaleDpTheme(250)};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
