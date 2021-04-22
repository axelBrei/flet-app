import React, {useCallback} from 'react';
import {View} from 'react-native';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import Map from 'components/ui/Map';
import {Title} from 'components/ui/Title';
import {MainButton} from 'components/ui/MainButton';
import InputField from 'components/ui/InputField';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/NewShipmentPackageInfoScreen/shipmentPackageFormikConfig';
import OpenBoxImage from 'resources/images/open-box.svg';
import WeightImage from 'resources/images/weight.svg';
import {IconCard} from 'components/ui/IconCard';
import {theme} from 'constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectNewShipmentData,
  updateShipmentDescription,
  updateShipmentVehiculeData,
} from 'redux-store/slices/newShipmentSlice';
import {routes} from 'constants/config/routes';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {vehiculeSizeOptions} from 'constants/vehicleSizes';
import {VehiculeSizeItem} from 'components/navigation/NewShipmentPackageInfoScreen/VehiculeSizeItem';
import {VehicleDimensions} from 'components/navigation/NewShipmentPackageInfoScreen/VehicleDimensions';
import {WarningMessage} from 'components/ui/WarningMessage';
import {DriverHelpCard} from 'components/navigation/NewShipmentPackageInfoScreen/DriverHelpCard';

export default ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const dispatch = useDispatch();
  const {
    shipmentDescription: {startPoint, endPoint},
  } = useSelector(selectNewShipmentData);

  const onSubmit = useCallback(
    values => {
      dispatch(
        updateShipmentDescription({
          [FIELDS.DESCRIPTION]: values[FIELDS.DESCRIPTION],
          [FIELDS.VALUE]: parseInt(values[FIELDS.VALUE]),
        }),
      );
      dispatch(
        updateShipmentVehiculeData({
          [FIELDS.SIZE]: values[FIELDS.SIZE],
          [FIELDS.EXTRA_HELP]: values[FIELDS.EXTRA_HELP],
        }),
      );
      navigation.navigate(routes.newShipmentConfirmationScreen);
    },
    [dispatch],
  );

  const {
    values,
    errors,
    touched,
    handleSubmit,
    _setFieldValue,
    _setFieldTouched,
  } = useFormikCustom(
    formikConfig(onSubmit, {[FIELDS.SIZE]: vehiculeSizeOptions[0]}),
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
    <ScreenComponent
      contentContainerStyle={{
        flexDirection: isMobile ? 'column-reverse' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        justifyContent: isMobile ? 'center' : 'flex-start',
        width: '100%',
      }}
      scrollable>
      <CenteredContainer>
        <Title width="100%">Información del paquete</Title>
        <Input
          label="¿Qué estamos llevando?"
          icon="dropbox"
          value={values[FIELDS.DESCRIPTION]}
          onChangeText={_setFieldValue(FIELDS.DESCRIPTION)}
          onFocus={_setFieldTouched(FIELDS.DESCRIPTION)}
          error={touched[FIELDS.DESCRIPTION] && errors[FIELDS.DESCRIPTION]}
        />
        <Input
          label="¿Cuanto vale?"
          icon="currency-usd"
          unitString="(AR$)"
          value={values[FIELDS.VALUE]}
          onChangeText={_setFieldValue(FIELDS.VALUE)}
          onFocus={_setFieldTouched(FIELDS.VALUE)}
          error={touched[FIELDS.VALUE] && errors[FIELDS.VALUE]}
          keyboardType="numeric"
        />
        <Title textAlign="left" width="100%" padding="10px 0">
          ¿Qué vehículo necesitás?
        </Title>
        <GridList>{vehiculeSizeOptions.map(renderVehiculeSize)}</GridList>
        <VehicleDimensions {...values[FIELDS.SIZE]} />
        <WarningMessage
          message={
            'Tené en cuenta que si el paquete no entra en el vehículo seleccionado se te cobrará una extra por el cambio  de vehículo.'
          }
        />
        <DriverHelpCard
          onChangeValue={_setFieldValue(FIELDS.EXTRA_HELP)}
          value={values[FIELDS.EXTRA_HELP]}
        />
        <Button label="Continuar" onPress={handleSubmit} />
      </CenteredContainer>
      <StyledMap markers={[startPoint, endPoint]} accesible={false} />
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  padding: 0 20px;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding-top: 70px;
    `}
`;

const CenteredContainer = styled.View`
  align-items: center;
  width: 100%;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      height: 100%;
      width: 414px;
      align-self: flex-start;
    `}
`;

const StyledMap = styled(Map)`
  height: ${props => props.theme.screenHeight * 0.25}px;
  width: ${props => props.theme.screenWidth - 40}px;
  border-radius: 20px;
  margin-bottom: 15px;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      flex: 1;
      margin-top: 40px;
      margin-left: 20px;
      max-width: 350px;
    `}
`;

const GridList = styled(View)`
  width: 100%;
  margin-left: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Button = styled(MainButton)`
  margin: 20px;
`;

const Input = styled(InputField)`
  margin: 5px 0;
`;
