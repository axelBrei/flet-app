import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import styled from 'styled-components';
import {Screen as BaseScreen} from 'components/ui/Screen';
import {scaleDpTheme} from 'helpers/responsiveHelper';

export default () => {
  return <Screen />;
};

const Screen = styled(BaseScreen)`
  flex: 1;
  align-items: center;
  padding-top: ${scaleDpTheme(Platform.OS === 'web' ? 100 : 20)};
`;
