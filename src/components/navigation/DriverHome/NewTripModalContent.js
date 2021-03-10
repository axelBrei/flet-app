import React from 'react';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {MainButton} from 'components/ui/MainButton';
import {TextLink} from 'components/ui/TextLink';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {useSelector} from 'react-redux';
import {selectLoadingPendingShipmentAnswer} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';

const strings = {
  newTrip: '¡Nuevo viaje!',
  distance: 'Distancia: ',
  dropZone: 'Zona de entrega: ',
  disclaimer: 'Recorda avisarnos cuando tengas\nel paquete en tus manos',
  reject: 'Rechazar',
};

export const NewTripModalContent = ({
  distance,
  dropZone,
  onPressAccept,
  onPressReject,
}) => {
  const loading = useSelector(selectLoadingPendingShipmentAnswer);
  return (
    <ContentContainer>
      <AppText width="100%" textAlign="center" fontSize={24} bold>
        {strings.newTrip}
      </AppText>
      <ContentContainer>
        <AppText padding={`${scaleDp(10)}px 0`}>
          {strings.distance}
          <AppText bold>{distance} metros</AppText>
        </AppText>
        <AppText>
          {strings.dropZone}
          <AppText bold>{dropZone}</AppText>
        </AppText>
      </ContentContainer>
      <ButtonsContainer>
        <Container dir="row" justifyContent="center" alignItems="center">
          <Icon
            color={theme.primaryDarkColor}
            name="alert-circle-outline"
            size={scaleDp(20)}
          />
          <AppText padding={scaleDp(5)}>{strings.disclaimer}</AppText>
        </Container>
        <Loader loading={loading}>
          <MainButton
            onPress={onPressAccept}
            label="Aceptar"
            style={{width: '75%'}}
          />
          <TextLink fontSize={14} color={theme.error} onPress={onPressReject}>
            {strings.reject}
          </TextLink>
        </Loader>
      </ButtonsContainer>
    </ContentContainer>
  );
};

NewTripModalContent.defaultProps = {
  onPressAccept: () => {},
  onPressReject: () => {},
};

const ContentContainer = styled(Container)`
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${scaleDpTheme(10)};
`;

const ButtonsContainer = styled(Container)`
  margin-top: ${scaleDpTheme(10)};
  align-items: center;
  justify-content: center;
  width: 100%;
`;
