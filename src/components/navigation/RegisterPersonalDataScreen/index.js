import React, {useCallback, useEffect} from 'react';
import styled, {css} from 'styled-components';
import InputField from 'components/ui/InputField';
import {useRoute} from '@react-navigation/native';
import {Row} from 'components/ui/Row';
import {MainButton} from 'components/ui/MainButton';
import {DriverExtraData} from 'components/navigation/RegisterPersonalDataScreen/DriverExtraData';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/RegisterPersonalDataScreen/formikConfig';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerUser,
  selectIsLoadingRegister,
  selectRegisterError,
  selectRegisterDriverData,
  registerDriverPersonalData,
} from 'redux-store/slices/registerSlice';
import {routes} from 'constants/config/routes';

export default ({navigation}) => {
  const {params} = useRoute();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoadingRegister);
  const error = useSelector(selectRegisterError);
  const savedData = useSelector(selectRegisterDriverData);

  const onSubmit = useCallback(
    values => {
      dispatch(
        (params.driver ? registerDriverPersonalData : registerUser)?.(values),
      );
    },
    [dispatch, params],
  );

  const {
    values,
    errors,
    touched,
    _setFieldTouched,
    _setFieldValue,
    submited,
    handleSubmit,
  } = useFormikCustom(formikConfig(savedData, params?.driver, onSubmit));

  useEffect(() => {
    if (submited && !loading && !error) {
      navigation.navigate(routes.registerDriverVehiculeScreen);
    }
  }, [submited, loading, error]);

  return (
    <ScreenComponent scrollable>
      <StyledRow>
        <InputField
          style={{width: '49%'}}
          label="Cod. de país"
          keyboardType="numeric"
          value={values[FIELDS.COUNTRY_CODE]}
          onBlur={_setFieldTouched(FIELDS.COUNTRY_CODE)}
          error={touched[FIELDS.COUNTRY_CODE] && errors[FIELDS.COUNTRY_CODE]}
          onChangeText={_setFieldValue(FIELDS.COUNTRY_CODE)}
        />
        <InputField
          style={{width: '49%'}}
          label="Cod. de área"
          keyboardType="numeric"
          value={values[FIELDS.AREA_CODE]}
          onBlur={_setFieldTouched(FIELDS.AREA_CODE)}
          error={touched[FIELDS.AREA_CODE] && errors[FIELDS.AREA_CODE]}
          onChangeText={_setFieldValue(FIELDS.AREA_CODE)}
        />
      </StyledRow>
      <InputField
        label="Número de telefono"
        keyboardType="phone-pad"
        value={values[FIELDS.PHONE]}
        onBlur={_setFieldTouched(FIELDS.PHONE)}
        error={touched[FIELDS.PHONE] && errors[FIELDS.PHONE]}
        onChangeText={_setFieldValue(FIELDS.PHONE)}
      />
      {params?.driver && (
        <DriverExtraData
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={_setFieldTouched}
          setFieldValue={_setFieldValue}
        />
      )}
      <MainButton
        label={params?.driver ? 'Siguiente' : 'Finalizar'}
        onPress={handleSubmit}
        loading={loading}
      />
    </ScreenComponent>
  );
};

const ScreenComponent = styled.View`
  padding: 0 20px;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding: 20px 0;
      width: 414px;
      align-self: center;
    `}
`;

const StyledRow = styled(Row)`
  padding: 0;
`;
