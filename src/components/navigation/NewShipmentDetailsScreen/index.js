import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {Container} from 'components/ui/Container';
import {View} from 'react-native';
import {VehiculeSizeItem} from 'components/navigation/NewShipmentDetailsScreen/VehiculeSizeItem';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {MainButton} from 'components/ui/MainButton';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/NewShipmentDetailsScreen/orderShippmentDetailsFormikConfig';
import {routes} from 'constants/config/routes';
import {useDispatch} from 'react-redux';
import {updateShipmentVehiculeData} from 'redux-store/slices/newShipmentSlice';
import {Title} from 'components/ui/Title';
import {VehicleDimensions} from 'components/navigation/NewShipmentDetailsScreen/VehicleDimensions';
import {WarningMessage} from 'components/ui/WarningMessage';
import {DriverHelpCard} from 'components/navigation/NewShipmentDetailsScreen/DriverHelpCard';
import {vehiculeSizeOptions} from 'constants/vehicleSizes';

export default ({navigation}) => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values) => {
      const vehicleSize = values[FIELDS.SIZE];
      const {dimensions, ...size} = vehicleSize;
      dispatch(
        updateShipmentVehiculeData({
          ...values,
          [FIELDS.SIZE]: {
            ...size,
          },
        }),
      );
      navigation.navigate(routes.newShipmentConfirmationScreen);
    },
    [navigation, dispatch],
  );

  const {values, _setFieldValue, handleSubmit} = useFormikCustom(
    formikConfig(onSubmit, {
      [FIELDS.SIZE]: vehiculeSizeOptions[0],
    }),
  );

  const renderVehiculeSize = useCallback(
    (item, idx) => (
      <VehiculeSizeItem
        key={idx}
        selected={values[FIELDS.SIZE]?.id === item.id}
        onPress={_setFieldValue(FIELDS.SIZE)}
        {...item}
      />
    ),
    [values, _setFieldValue],
  );

  return (
    <Screen scrollable removeTWF>
      <VehicleTitle>¿Qué vehículo necesitás?</VehicleTitle>
      <GridList>{vehiculeSizeOptions.map(renderVehiculeSize)}</GridList>
      <FormContainer>
        <VehicleDimensions {...values[FIELDS.SIZE]} />
        <WarningMessage
          message={
            'Tené en cuenta que si el paquete no entra en el vehículo seleccionado se te cobrará una extra por el cambio  de vehículo.'
          }
        />
        <DriverHelpCard
          value={values[FIELDS.EXTRA_HELP]}
          onChangeValue={_setFieldValue(FIELDS.EXTRA_HELP)}
        />
        <ButtonContainer>
          <MainButton label="Continuar" onPress={handleSubmit} />
        </ButtonContainer>
      </FormContainer>
    </Screen>
  );
};

const VehicleTitle = styled(Title)`
  margin-left: 20px;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      margin-top: 70px;
    `}
`;

const FormContainer = styled(Container)`
  width: ${(props) => (props.theme.isMobile ? props.theme.screenWidth : 414)}px;
  padding: 10px 20px;
`;

const GridList = styled(View)`
  margin-left: 20px;
  flex-direction: row;
  justify-content: center;

  width: ${({theme}) => theme.screenWidth}px;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      align-items: center;
      justify-content: flex-start;
      width: 100%;
    `}
`;

const ButtonContainer = styled(View)`
  width: 100%;
  align-items: center;
`;
