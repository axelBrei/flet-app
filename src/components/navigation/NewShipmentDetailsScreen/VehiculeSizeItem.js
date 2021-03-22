import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';

export const VehiculeSizeItem = ({
  selected,
  onPress,
  renderIcon = () => <></>,
  ...props
}) => {
  return (
    <ItemContainer>
      <Container
        onPress={() => {
          const {renderIcon, ...rest} = props;
          onPress(rest);
        }}
        selected={selected}>
        {renderIcon(50)}
        <Title color={selected ? theme.white : theme.fontColor}>
          {props.title}
        </Title>
      </Container>
    </ItemContainer>
  );
};

const ItemContainer = styled(View)`
  width: ${({theme}) =>
    theme.isMobile ? `${theme.screenWidth / 2 - 20}px` : '170px'};
  margin-top: 15px;
`;

const Container = styled(TouchableOpacity)`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${({selected}) =>
    selected ? theme.primaryColor : theme.grayBackground};
`;

// const DataContainer = styled(Container)`
//   margin-left: ${scaleDpTheme(15)};
//   height: 100%;
//   justify-content: space-between;
//   flex-direction: column;
// `;
