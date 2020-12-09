import React, {useCallback} from 'react';
import {Screen} from 'components/ui/Screen';
import {ScrollView} from 'react-native';
import {
  legalDriverDataFormikConfig,
  FIELDS,
} from 'components/navigation/RegisterDriverLegalDataScreen/legalDriverDataFormikConfig';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import SelectImage from 'components/ui/SelectImage/index';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {MainButton} from 'components/ui/MainButton';
import {Platform} from 'react-native';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {routes} from 'constants/config/routes';
import {registerDriver} from 'redux-store/slices/registerSlice';
import {useDispatch} from 'react-redux';

export default ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values) => {
      dispatch(registerDriver(values));
      // TODO: replace landing screen for home screen
      navigation.navigate(routes.landingScreen);
    },
    [navigation, dispatch],
  );

  const {
    values,
    errors,
    touched,
    _setFieldValue,
    handleSubmit,
  } = useFormikCustom(legalDriverDataFormikConfig(onSubmit));
  return (
    <Screen scrollable={isMobile}>
      <FloatingBackgroundOval visible={isMobile} />
      <ScreenContainer>
        <Title bold fontSize={25} textAlign="center">
          {'Ahora tenemos que verificar\nque puedas manejar'}
        </Title>
        <Container
          style={
            !isMobile && {
              maxWidth: scaleDp(350),
              alignSelf: 'center',
            }
          }>
          <SelectImage
            label="Foto de tu DNI (Frente)"
            value={values[FIELDS.DOCUMENT_FRONT]}
            error={
              touched[FIELDS.DOCUMENT_FRONT] && errors[FIELDS.DOCUMENT_FRONT]
            }
            onSelectImage={_setFieldValue(FIELDS.DOCUMENT_FRONT)}
          />
          <SelectImage
            label="Foto de tu DNI (Dorso)"
            value={values[FIELDS.DOCUMENT_BACK]}
            error={
              touched[FIELDS.DOCUMENT_BACK] && errors[FIELDS.DOCUMENT_BACK]
            }
            onSelectImage={_setFieldValue(FIELDS.DOCUMENT_BACK)}
          />
          <SelectImage
            label="Foto de la poliza de seguro"
            value={values[FIELDS.INSURANCE]}
            error={touched[FIELDS.INSURANCE] && errors[FIELDS.INSURANCE]}
            onSelectImage={_setFieldValue(FIELDS.INSURANCE)}
          />
          <SelectImage
            label="Foto del libre antecedentes"
            value={values[FIELDS.BACKGROUND]}
            error={touched[FIELDS.BACKGROUND] && errors[FIELDS.BACKGROUND]}
            onSelectImage={_setFieldValue(FIELDS.BACKGROUND)}
          />
          <SelectImage
            label={
              'Foto de la verificación de vivienda,\nmonotributo o pago de servicios'
            }
            value={values[FIELDS.ADDRESS_VALIDATION]}
            error={
              touched[FIELDS.ADDRESS_VALIDATION] &&
              errors[FIELDS.ADDRESS_VALIDATION]
            }
            onSelectImage={_setFieldValue(FIELDS.ADDRESS_VALIDATION)}
          />
          <MainButton
            label="Finalizar"
            onPress={handleSubmit}
            style={{
              width: scaleDp(250),
              alignSelf: 'center',
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
  padding-top: ${(props) => scaleDp(props.theme.isMobile ? 60 : 10)}px;
  padding-bottom: ${(props) => scaleDp(props.theme.isMobile ? 75 : 10)}px;
  text-align: center;
`;
