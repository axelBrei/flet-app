import React, {useMemo} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {theme} from 'constants/theme';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Icon} from 'components/ui/Icon';

export const MainButton = ({
  label,
  icon,
  onPress,
  inverted,
  alternative,
  ...props
}) => {
  const buttonColors = useMemo(() => {
    if (inverted) {
      return {
        color: theme.primaryColor,
        backgroundColor: theme.backgroundColor,
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
        <Text color={buttonColors?.color}>{label}</Text>
        <FloatingIcon
          color={buttonColors?.color ?? theme.white}
          name={icon}
          size={Platform.OS === 'web' ? 30 : 25}
        />
      </Container>
    </Button>
  );
};

MainButton.defaultProps = {
  label: '',
  icon: '',
  onPress: () => {},
  inverted: false,
  alternative: false,
};

const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled(AppText)`
  flex: 1;
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
  margin: 20px;
  width: ${scaleDpTheme(250)};
  min-width: ${scaleDpTheme(170)};
  border-radius: 10px;
  padding: ${scaleDpTheme(5)};
  padding-top: ${scaleDpTheme(Platform.OS === 'web' ? 7 : 10)};
  padding-bottom: ${scaleDpTheme(Platform.OS === 'web' ? 7 : 10)};
  z-index: 0;
`;
