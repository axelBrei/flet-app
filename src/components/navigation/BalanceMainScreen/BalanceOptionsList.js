import React from 'react';
import styled, {css} from 'styled-components';
import {FlatList} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {Row} from 'components/ui/Row';
import {Title} from 'components/ui/Title';
import {routes} from 'constants/config/routes';
import {useNavigation} from '@react-navigation/native';

const OPTIONS = [
  {title: 'Últimos movimientos', navigateTo: routes.balanceLastMovements},
  {title: 'Pagos pendientes', navigateTo: routes.balancePendingMovementsScreen},
  {title: 'Modificar cuenta de pago', actionName: 'openCbuModal'},
];

export const BalanceOptionsList = props => {
  const navigation = useNavigation();
  return (
    <Container>
      <Title>Opciones</Title>
      {OPTIONS.map((item, index) => (
        <ButtonContainer
          key={index.toString()}
          onPress={() => {
            props[item?.actionName]?.();
            item.navigateTo && navigation.navigate(item.navigateTo);
          }}>
          <Row>
            <AppText>{item.title}</AppText>
            <Icon size={20} name="chevron-right" />
          </Row>
        </ButtonContainer>
      ))}
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 0;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      align-self: center;
      width: max(414px, 80%);
    `};
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
`;
