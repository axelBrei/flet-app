import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const Checkbox = ({text, onPress, isChecked}) => {
  return (
    <Container onPress={() => onPress(!isChecked)}>
      <Icon
        size={scaleDp(Platform.OS === 'web' ? 12 : 18)}
        name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        color={theme.accentColor}
      />
      <Text fontSize={Platform.OS === 'web' ? 10 : 15}>{text}</Text>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.scale(3)}px;
  margin-bottom: ${(props) => props.theme.scale(3)}px;
`;

const Text = styled(AppText)`
  margin-left: ${(props) => props.theme.scale(5)}px;
`;

Checkbox.defaultProps = {
  isChecked: false,
  onPress: () => {},
};
