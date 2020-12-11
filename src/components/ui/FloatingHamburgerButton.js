import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon} from 'components/ui/Icon';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

export const FloatingHamburguerButton = () => {
  const navigation = useNavigation();

  return (
    <ContainerButton onPress={navigation?.toggleDrawer}>
      <Icon name="menu" size={scaleDp(25)} color={theme.primaryDarkColor} />
    </ContainerButton>
  );
};

const ContainerButton = styled(TouchableOpacity)`
  position: absolute;
  left: ${scaleDpTheme(12)};
  top: ${scaleDpTheme(12)};
  align-items: center;
  justify-content: center;
  padding: ${scaleDpTheme(8)};
  border-radius: ${scaleDpTheme(20)};
  background-color: ${theme.white};
  box-shadow: 0.5px 1px 2px ${theme.disabled};
`;
