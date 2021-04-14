import React, {useCallback, useEffect} from 'react';
import InputField from 'components/ui/InputField';
import styled from 'styled-components';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/RegisterPersonalDataScreen/formikConfig';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {Row} from 'components/ui/Row';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAddTelephone,
  selectIsLoadingUpdateTelephones,
  selectUpdateTelephonesError,
} from 'redux-store/slices/personalData/telephonesSlice';

export const NewPhoneForm = ({onSubmit}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingUpdateTelephones);
  const error = useSelector(selectUpdateTelephonesError);

  const onSubmitForm = useCallback(values => {
    console.log(values);
    dispatch(fetchAddTelephone(values));
  }, []);

  const {
    values,
    errors,
    touched,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
    submited,
    isSubmitting,
  } = useFormikCustom(formikConfig({}, false, onSubmitForm));

  useEffect(() => {
    if (submited && !isLoading && !error) {
      onSubmit();
    }
  }, [submited, isLoading, error, onSubmit]);

  return (
    <Container>
      <Row disablePadding>
        <InputField
          style={{width: '49%'}}
          label="Cod. de país"
          keyboardType="numeric"
          value={values[FIELDS.COUNTRY_CODE]}
          onBlur={_setFieldTouched(FIELDS.COUNTRY_CODE)}
          error={touched[FIELDS.COUNTRY_CODE] && errors[FIELDS.COUNTRY_CODE]}
          onChangeText={_setFieldValue(FIELDS.COUNTRY_CODE)}
          editable={!isLoading}
        />
        <InputField
          style={{width: '49%'}}
          label="Cod. de área"
          keyboardType="numeric"
          value={values[FIELDS.AREA_CODE]}
          onBlur={_setFieldTouched(FIELDS.AREA_CODE)}
          error={touched[FIELDS.AREA_CODE] && errors[FIELDS.AREA_CODE]}
          onChangeText={_setFieldValue(FIELDS.AREA_CODE)}
          editable={!isLoading}
        />
      </Row>
      <InputField
        label="Número de telefono"
        keyboardType="phone-pad"
        value={values[FIELDS.PHONE]}
        onBlur={_setFieldTouched(FIELDS.PHONE)}
        error={touched[FIELDS.PHONE] && errors[FIELDS.PHONE]}
        onChangeText={_setFieldValue(FIELDS.PHONE)}
        editable={!isLoading}
      />
      <MainButton
        loading={isLoading}
        label="Confirmar"
        onPress={handleSubmit}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 20px 0;
`;
