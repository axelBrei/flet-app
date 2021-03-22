import React, {useCallback, useEffect, useState} from 'react';
import {Screen} from 'components/ui/Screen';
import styled, {css} from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import InputField from 'components/ui/InputField';
import {
  vehiculeDataFormikConfig,
  FIELDS,
} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import {Container} from 'components/ui/Container';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import SelectImage from 'components/ui/SelectImage/index';
import {MainButton} from 'components/ui/MainButton';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import CarImage from 'resources/images/car.svg';
import {routes} from 'constants/config/routes';
import {Row} from 'components/ui/Row';
import {
  registerDriverVehicleData,
  selectIsLoadingRegister,
  selectRegisterError,
} from 'redux-store/slices/registerSlice';
import {useDispatch, useSelector} from 'react-redux';
import {IconCard} from 'components/ui/IconCard';
import {theme} from 'constants/theme';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingRegister);
  const error = useSelector(selectRegisterError);

  const onSubmit = useCallback(
    (values) => {
      const {
        [FIELDS.HEIGHT]: h,
        [FIELDS.WIDTH]: w,
        [FIELDS.LENGTH]: l,
        ...rest
      } = values;
      dispatch(
        registerDriverVehicleData({
          ...rest,
          dimensions: {
            height: parseInt(h),
            width: parseInt(w),
            length: parseInt(l),
          },
        }),
      );
    },
    [navigation, dispatch],
  );

  const {
    values,
    errors,
    touched,
    submited,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
  } = useFormikCustom(vehiculeDataFormikConfig(onSubmit));

  useEffect(() => {
    if (submited && !isLoading && !error) {
      navigation.navigate(routes.registerDriverLegalsScreen);
    }
  }, [submited, isLoading, error]);

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
          label="Modelo"
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
        <IconCard
          renderImage={(size) => <CarImage height={size} width={size} />}>
          <AppText bold color={theme.white} padding={5}>
            Capcidad de carga
          </AppText>
          <DimensionInput
            label="Alto"
            unitString="Cm."
            keyboardType="numeric"
            value={values[FIELDS.HEIGHT]}
            onBlur={_setFieldTouched(FIELDS.HEIGHT)}
            onChangeText={_setFieldValue(FIELDS.HEIGHT)}
            error={touched[FIELDS.HEIGHT] && errors[FIELDS.HEIGHT]}
          />
          <DimensionInput
            label="Ancho"
            unitString="Cm."
            keyboardType="numeric"
            value={values[FIELDS.WIDTH]}
            onBlur={_setFieldTouched(FIELDS.WIDTH)}
            onChangeText={_setFieldValue(FIELDS.WIDTH)}
            error={touched[FIELDS.WIDTH] && errors[FIELDS.WIDTH]}
          />
          <DimensionInput
            label="Largo"
            unitString="Cm."
            keyboardType="numeric"
            value={values[FIELDS.LENGTH]}
            onBlur={_setFieldTouched(FIELDS.LENGTH)}
            onChangeText={_setFieldValue(FIELDS.LENGTH)}
            error={touched[FIELDS.LENGTH] && errors[FIELDS.LENGTH]}
          />
        </IconCard>
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
