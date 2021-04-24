import React, {useCallback, useEffect, useState} from 'react';
import {Screen} from 'components/ui/Screen';
import styled, {css} from 'styled-components';
import {scaleDp} from 'helpers/responsiveHelper';
import InputField from 'components/ui/InputField';
import {
  vehiculeDataFormikConfig,
  FIELDS,
} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import {Container} from 'components/ui/Container';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import SelectImage from 'components/ui/SelectImage/index';
import {MainButton} from 'components/ui/MainButton';
import {routes} from 'constants/config/routes';
import {Row} from 'components/ui/Row';
import {
  registerDriverVehicleData,
  selectIsLoadingRegister,
  selectRegisterError,
} from 'redux-store/slices/registerSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'components/ui/Dropdown';
import {
  fetchVehicleTypes,
  selectLoadingVehicleTypes,
  selectVehicleTypes,
} from 'redux-store/slices/vehicleTypesSlice';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingRegister);
  const error = useSelector(selectRegisterError);
  const vehicleTypes = useSelector(selectVehicleTypes);
  const loadingTypes = useSelector(selectLoadingVehicleTypes);

  useEffect(() => {
    dispatch(fetchVehicleTypes());
  }, []);

  const onSubmit = useCallback(
    values => {
      const {[FIELDS.VEHICLE_TYPE]: type, ...rest} = values;
      dispatch(
        registerDriverVehicleData({
          type: type.id,
          ...rest,
        }),
      );
    },
    [navigation, dispatch],
  );

  const {
    values,
    errors,
    touched,
    isSubmitting,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
  } = useFormikCustom(vehiculeDataFormikConfig(onSubmit));

  useEffect(() => {
    if (isSubmitting && !isLoading && !error) {
      navigation.navigate(routes.registerDriverLegalsScreen);
    }
  }, [isSubmitting, isLoading, error]);

  return (
    <Screen scrollable>
      <ScreenContainer>
        <InputField
          label="Patente"
          value={values[FIELDS.PLATE]}
          onBlur={_setFieldTouched(FIELDS.PLATE)}
          onChangeText={_setFieldValue(FIELDS.PLATE)}
          error={touched[FIELDS.PLATE] && errors[FIELDS.PLATE]}
        />
        <InputField
          label="Marca y Modelo"
          value={values[FIELDS.MODEL]}
          onBlur={_setFieldTouched(FIELDS.MODEL)}
          onChangeText={_setFieldValue(FIELDS.MODEL)}
          error={touched[FIELDS.MODEL] && errors[FIELDS.MODEL]}
        />
        <InputField
          label="Año del vehículo"
          keyboardType="numeric"
          value={values[FIELDS.YEAR]}
          onBlur={_setFieldTouched(FIELDS.YEAR)}
          onChangeText={_setFieldValue(FIELDS.YEAR)}
          error={touched[FIELDS.YEAR] && errors[FIELDS.YEAR]}
        />
        <InputField
          label="Color del vehículo"
          value={values[FIELDS.COLOR]}
          onBlur={_setFieldTouched(FIELDS.COLOR)}
          onChangeText={_setFieldValue(FIELDS.COLOR)}
          error={touched[FIELDS.COLOR] && errors[FIELDS.COLOR]}
        />
        <Dropdown
          loading={loadingTypes}
          label="Tipo de vehiculo"
          value={values[FIELDS.VEHICLE_TYPE]}
          onItemPress={_setFieldValue(FIELDS.VEHICLE_TYPE)}
          onBlur={_setFieldTouched(FIELDS.VEHICLE_TYPE)}
          data={vehicleTypes}
          error={
            error ||
            (touched[FIELDS.VEHICLE_TYPE] && errors[FIELDS.VEHICLE_TYPE])
          }
        />
        <ImagesContainer>
          <SelectImage
            style={{width: '49%'}}
            label="Cédula (Frente)"
            value={values[FIELDS.LICENSE_FRONT]}
            onSelectImage={_setFieldValue(FIELDS.LICENSE_FRONT)}
            error={
              touched[FIELDS.LICENSE_FRONT] && errors[FIELDS.LICENSE_FRONT]
            }
          />
          <SelectImage
            style={{width: '49%'}}
            label="Cédula Dorso"
            value={values[FIELDS.LICENSE_BACK]}
            onSelectImage={_setFieldValue(FIELDS.LICENSE_BACK)}
            error={touched[FIELDS.LICENSE_BACK] && errors[FIELDS.LICENSE_BACK]}
          />
        </ImagesContainer>
        <MainButton
          loading={isLoading}
          onPress={handleSubmit}
          label="Continuar"
          style={{width: scaleDp(250)}}
        />
      </ScreenContainer>
    </Screen>
  );
};

const ScreenContainer = styled(Container)`
  padding: 0 20px;
  align-self: center;
  align-items: center;
  width: 100%;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding: 0;
      width: 414px;
      align-self: center;
    `}
`;

const ImagesContainer = styled(Row)`
  margin-top: 15px;
`;

const DimensionInput = styled(InputField)`
  margin-bottom: 5px;
`;
