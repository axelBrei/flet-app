import React from 'react';
import styled from 'styled-components';
import {ActivityIndicator, Platform} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {MainButton} from 'components/ui/MainButton';
import {TextLink} from 'components/ui/TextLink';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {useSelector} from 'react-redux';
import {selectLoadingPendingShipmentAnswer} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';
import {IconCard} from 'components/ui/IconCard';
import PackageImage from 'resources/images/open-box.svg';
import DestinationImage from 'resources/images/destination-pin.svg';
import {RowWithBoldData} from 'components/ui/RowWithBoldData';

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
    <Container>
      <Title width="100%">¡Nuevo viaje!</Title>
      <Row>
        <StaticInputField bold label="Distancia" style={{width: '45%'}}>
          {distance} Km.
        </StaticInputField>
        <StaticInputField bold label="Llegas a las" style={{width: '45%'}}>
          12:49 Hs.
        </StaticInputField>
      </Row>
      <IconCard
        reverse
        reduced
        renderImage={(size) => (
          <PackageImage height={size - 20} width={size - 20} />
        )}>
        <Title alternative>Paquete</Title>
        <RowWithBoldData label="Alto" data="0,5 metros" />
        <RowWithBoldData label="Ancho" data="0,5 metros" />
        <RowWithBoldData label="Largo" data="0,5 metros" />
        <RowWithBoldData
          numberOfLines={1}
          label="Desc."
          data="Una descripcion"
        />
      </IconCard>
      <IconCard
        reverse
        reduced
        renderImage={(size) => (
          <DestinationImage height={size - 25} width={size - 25} />
        )}>
        <Title alternative>Destino</Title>
        <RowWithBoldData label="Zona" data="Capital Federal" />
        <RowWithBoldData label="Llegada" data="21:45 - 21:55 Hs." />
      </IconCard>
      {loading ? (
        <ActivityIndicator
          animating
          style={{marginVertical: 12}}
          color={theme.primaryColor}
          size={Platform.OS === 'ios' ? 'large' : 50}
        />
      ) : (
        <Row>
          <Button color={theme.cancel} onPress={onPressReject}>
            Cancelar
          </Button>
          <Button color={theme.online} onPress={onPressAccept}>
            Aceptar
          </Button>
        </Row>
      )}
    </Container>
  );
};

NewTripModalContent.defaultProps = {
  onPressAccept: () => {},
  onPressReject: () => {},
};

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;

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

const Button = styled(MainButton)`
  background-color: ${(props) => props.color};
  padding: 10px;
  width: 45%;
  margin-top: 10px;
`;
