import React, {useCallback, useState} from 'react';
import Screen from 'components/ui/Screen';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {DetailHeader} from 'components/navigation/LastShipmentDetailScreen/DetailHeader';
import {Title} from 'components/ui/Title';
import {ShipmentDestinationsSteps} from 'components/ui/ShipmentDestinationSteps';
import {StartRow} from 'components/ui/Row';
import {Icon} from 'components/ui/Icon';
import {RowWithBoldData} from 'components/ui/RowWithBoldData';
import {LayoutAnimation} from 'react-native';
import {vehiculeSizeOptions} from 'constants/vehicleSizes';
import {applyShadow} from 'helpers/uiHelper';

const LastShipmentDetailScreen = ({route}) => {
  const {shipment} = route.params || {};
  const [insuranceVisible, setInsuranceVisible] = useState(!shipment?.vehicle);
  const [vehicleDetailVisible, setVehicleDetailVisible] = useState(false);

  const toggleInsurance = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setInsuranceVisible(!insuranceVisible);
  }, [insuranceVisible]);

  const toggleVehicle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVehicleDetailVisible(!vehicleDetailVisible);
  }, [vehicleDetailVisible]);

  const vehicleSize = vehiculeSizeOptions.find(i => i.id === 2);

  return (
    <Screen removeTWF enableAvoidKeyboard={false}>
      <DetailHeader {...shipment} />
      <ContentContainer>
        <Card>
          <Title>Destinos</Title>
          <ShipmentDestinationsSteps destinations={shipment.destinations} />
        </Card>
        <Card isBottom>
          <ListHeader onPress={toggleInsurance}>
            <AppText fontSize={20} bold>
              Seguro
            </AppText>
            <Icon name="chevron-down" size={25} />
          </ListHeader>
          {insuranceVisible && (
            <>
              <DataRow
                alternative={false}
                label="Seguro seleccionado"
                data={shipment?.insurance?.title}
              />
              <DataRow
                alternative={false}
                label="Costo"
                data={`$${Math.round(
                  shipment?.package?.value *
                    shipment?.insurance?.valueModificator,
                )}`}
              />
            </>
          )}
          {shipment.vehicle && (
            <>
              <Divider />
              <ListHeader onPress={toggleVehicle}>
                <AppText fontSize={20} bold>
                  Vehículo asignado
                </AppText>
                <Icon name="chevron-down" size={25} />
              </ListHeader>
              {vehicleDetailVisible && (
                <StartRow>
                  <IconBackground>{vehicleSize.renderIcon(50)}</IconBackground>
                  <AppText bold>
                    {shipment?.vehicle?.model}
                    {'\n'}
                    <AppText>
                      {shipment?.vehicle?.year} - {shipment?.vehicle?.color}
                    </AppText>
                  </AppText>
                </StartRow>
              )}
            </>
          )}
        </Card>
      </ContentContainer>
    </Screen>
  );
};
export default LastShipmentDetailScreen;

const ContentContainer = styled.ScrollView`
  padding: 20px 0;
`;

const Card = styled.View`
  flex: 1;
  background-color: white;
  box-shadow: 1px 3px 6px ${theme.shadowColor};
  border-radius: 12px;
  padding: 15px 20px ${props => (props.isBottom ? 15 : 0)}px;
  margin: 0 20px 20px;
`;
Card.defaultProps = applyShadow();

const Divider = styled.View`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: ${theme.disabledFont};
`;

const ListHeader = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const DataRow = styled(RowWithBoldData)`
  margin: 5px 0;
`;

const IconBackground = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: ${theme.primaryLightColor};
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;
