import React, {useCallback} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {TextLink} from 'components/ui/TextLink';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AssignedDriverProfile} from 'components/navigation/ShipmentScreen/AssignedDriverProfile';
import {theme} from 'constants/theme';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';

export const ShipmentDetailCard = () => {
  const navigation = useNavigation();
  const onPressHaveAProblem = useCallback(() => {}, []);

  const onPressCancel = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <Card>
      <Title>¡Gracias por elegirnos!</Title>
      <AppText>Tu conductor asignado es:</AppText>
      <AssignedDriverProfile />
      <Container>
        <ShipmentDataText>
          Tiempo estimado de llegada{' '}
          <AppText color={theme.primaryDarkColor}>4 min.</AppText>
        </ShipmentDataText>
        <ShipmentDataText>
          Costo total <AppText color={theme.primaryDarkColor}>$2000</AppText>
        </ShipmentDataText>
        <ShipmentDataText>
          Valor asegurado{' '}
          <AppText color={theme.primaryDarkColor}>$15.000</AppText>
        </ShipmentDataText>
      </Container>
      <ButtonContainer>
        <MainButton
          label="Tengo un problema"
          inverted
          onPress={onPressHaveAProblem}
        />
        <TextLink fontSize={12} color={theme.error} onPress={onPressCancel}>
          Cancelar Pedido
        </TextLink>
      </ButtonContainer>
    </Card>
  );
};

const Card = styled(Container)`
  width: ${(props) =>
    props.theme.isMobile ? `${props.theme.screenWidth}px` : '100%'};
  align-items: flex-start;
`;

const Title = styled(AppText)`
  margin: ${scaleDpTheme(10)} 0;
  font-weight: bold;
  font-size: ${scaleDpTheme(18)};
`;

const ButtonContainer = styled(Container)`
  width: 100%;
  margin-top: ${scaleDpTheme(30)};
  align-items: center;
  justify-content: center;
`;

const ShipmentDataText = styled(AppText)`
  padding: ${scaleDpTheme(7)} 0;
`;
