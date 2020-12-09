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
    <Screen scrollable={isMobile}>
      <FloatingBackgroundOval visible={isMobile} />
      <ScreenContainer>
        <Title bold fontSize={25}>
          Necesitamos algunos datos tuyos
        </Title>
        <Container
          alignItems="center"
          width="100%"
          style={[
            !isMobile && {
              maxWidth: scaleDp(300),
              alignSelf: 'center',
              justifyContent: 'center',
            },
          ]}>
          <InputField
            value={values[FIELDS.DOCUMENT]}
            onChangeText={_setFieldValue(FIELDS.DOCUMENT)}
            onBlur={_setFieldTouched(FIELDS.DOCUMENT)}
            error={touched[FIELDS.DOCUMENT] && errors[FIELDS.DOCUMENT]}
            label="Documento"
            icon="card-account-details-outline"
            keyboardType="numeric"
          />
          <CalendarPicker
            value={values[FIELDS.BIRTH_DATE]}
            onSelectDay={_setFieldValue(FIELDS.BIRTH_DATE)}
            error={touched[FIELDS.BIRTH_DATE] && errors[FIELDS.BIRTH_DATE]}
            label="Fecha de nacimiento"
          />
          <InputField
            value={values[FIELDS.CBU]}
            onChangeText={_setFieldValue(FIELDS.CBU)}
            onBlur={_setFieldTouched(FIELDS.CBU)}
            error={touched[FIELDS.CBU] && errors[FIELDS.CBU]}
            label="CBU"
            icon="credit-card-outline"
            keyboardType="numeric"
          />
          <SelectImage
            label="Necesitamos una foto tuya"
            value={values[FIELDS.PROFILE_IMAGE]}
            onSelectImage={_setFieldValue(FIELDS.PROFILE_IMAGE)}
            error={
              touched[FIELDS.PROFILE_IMAGE] && errors[FIELDS.PROFILE_IMAGE]
            }
          />
          <MainButton
            label="Continuar"
            onPress={handleSubmit}
            style={{
              width: scaleDp(250),
            }}
          />
        </Container>
      </ScreenContainer>
    </Screen>
  );
};

const ScreenContainer = styled(Container)`
  padding-left: ${scaleDpTheme(15)};
  padding-right: ${scaleDpTheme(15)};
  align-self: center;
  align-items: center;
`;

const Title = styled(AppText)`
  padding-top: ${(props) => scaleDp(props.theme.isMobile ? 85 : 10)}px;
  padding-bottom: ${(props) => scaleDp(props.theme.isMobile ? 85 : 10)}px;
  text-align: center;
`;
