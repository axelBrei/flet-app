import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  registerDriverDataFormikConfig,
  FIELDS,
} from 'components/navigation/RegisterDriverDataScreen/registerDriverDataFormikConfig';
import InputField from 'components/ui/InputField';
import CalendarPicker from 'components/ui/CalendarPicker';
import {MainButton} from 'components/ui/MainButton';
import SelectImage from 'components/ui/SelectImage/index';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Platform} from 'react-native';
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {routes} from 'constants/config/routes';
import {updateDriverData} from 'redux-store/slices/registerSlice';
import {useDispatch} from 'react-redux';

export default ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values) => {
      navigation.navigate(routes.registerDriverVehiculeScreen);
      dispatch(updateDriverData(values));
    },
    [dispatch, navigation],
  );

  const {
    values,
    errors,
    touched,
    submitCount,
    handleSubmit,
    _setFieldTouched,
    _setFieldValue,
  } = useFormikCustom(registerDriverDataFormikConfig(onSubmit));

  return (
    <ScreenContainer>
      <FloatingBackgroundOval visible={isMobile} />
      <AppText
        bold
        fontSize={25}
        textAlign="center"
        color={isMobile ? theme.white : theme.fontColor}>
        Necesitamos algunos datos tuyos
      </AppText>
      <FormContainer>
        <InputField
          value={values[FIELDS.DOCUMENT]}
          onChangeText={_setFieldValue(FIELDS.DOCUMENT)}
          onBlur={_setFieldTouched(FIELDS.DOCUMENT)}
          error={
            submitCount > 0 &&
            touched[FIELDS.DOCUMENT] &&
            errors[FIELDS.DOCUMENT]
          }
          label="Documento"
          icon="card-account-details-outline"
        />
        <CalendarPicker
          value={values[FIELDS.BIRTH_DATE]}
          onSelectDay={_setFieldValue(FIELDS.BIRTH_DATE)}
          error={
            submitCount > 0 &&
            touched[FIELDS.BIRTH_DATE] &&
            errors[FIELDS.BIRTH_DATE]
          }
          label="Fecha de nacimiento"
        />
        <InputField
          value={values[FIELDS.CBU]}
          onChangeText={_setFieldValue(FIELDS.CBU)}
          onBlur={_setFieldTouched(FIELDS.CBU)}
          error={submitCount > 0 && touched[FIELDS.CBU] && errors[FIELDS.CBU]}
          label="CBU"
          icon="credit-card-outline"
        />
        <SelectImage
          label="Necesitamos una foto tuya"
          value={values[FIELDS.PROFILE_IMAGE]}
          onSelectImage={_setFieldValue(FIELDS.PROFILE_IMAGE)}
        />
        <MainButton
          label="Continuar"
          onPress={handleSubmit}
          style={{width: '85%'}}
        />
      </FormContainer>
    </ScreenContainer>
  );
};

const ScreenContainer = styled(Screen)`
  padding-top: ${(props) => scaleDpTheme(props.theme.isMobile ? 90 : 10)};
  padding-left: ${scaleDpTheme(10)};
  padding-right: ${scaleDpTheme(10)};
`;

const FormContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-top: ${(props) => scaleDp(props.theme.isMobile ? 80 : 10)}px;
  width: ${Platform.OS !== 'web' ? '100%' : '45%'};
`;
