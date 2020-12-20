import React from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {TouchableOpacity} from 'react-native';

export const PaymentOption = ({selected, icon, onPress, ...props}) => {
  return (
    <ItemContainer selected={selected} onPress={() => onPress(props)}>
      <Icon name={icon} size={scaleDp(18)} />
      <Title>{props.text}</Title>
    </ItemContainer>
  );
};

const ItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${(props) =>
    props.selected ? theme.primaryLightColor : theme.white};
  width: 99%;
  border-radius: ${scaleDpTheme(8)};
  elevation: 3;
  box-shadow: 0px 3px 6px ${theme.shadowColor};
  margin: ${scaleDpTheme(5)} 0;
  padding: ${scaleDpTheme(10)} ${scaleDpTheme(10)};
`;

const Title = styled(AppText)`
  margin-left: ${scaleDpTheme(5)};
`;
