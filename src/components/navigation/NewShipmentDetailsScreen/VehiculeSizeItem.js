import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

export const VehiculeSizeItem = ({
  selected,
  onPress,
  Icon,
  maxWeight,
  ...props
}) => {
  return (
    <ItemContainer onPress={() => onPress(props)} selected={selected}>
      <Icon color={theme.fontColor} height={scaleDp(30)} width={scaleDp(50)} />
      <DataContainer>
        <AppText fontSize={16}>{props.title}</AppText>
        <AppText fontSize={12} color={theme.disabled}>
          Hasta {maxWeight}kg
        </AppText>
      </DataContainer>
    </ItemContainer>
  );
};

const ItemContainer = styled(TouchableOpacity)`
  margin: ${scaleDpTheme(5)} 0;
  padding: ${scaleDpTheme(10)} ${scaleDpTheme(10)};
  align-items: center;
  flex-direction: row;
  background-color: ${(props) =>
    props.selected ? theme.primaryLightColor : theme.white};
  width: 99%;
  max-height: ${scaleDpTheme(55)};
  border-radius: ${scaleDpTheme(8)};
  elevation: 3;
  box-shadow: 0px 3px 6px ${theme.shadowColor};
`;

const DataContainer = styled(Container)`
  margin-left: ${scaleDpTheme(15)};
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
`;
