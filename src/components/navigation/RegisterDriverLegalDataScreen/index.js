import React, {useCallback, useEffect, useState} from 'react';
import Screen from 'components/ui/Screen';
import {
  legalDriverDataFormikConfig,
  FIELDS,
} from 'components/navigation/RegisterDriverLegalDataScreen/legalDriverDataFormikConfig';
import styled, {css} from 'styled-components';
import {AppText} from 'components/ui/AppText';
import SelectImage from 'components/ui/SelectImage/index';
import {Container} from 'components/ui/Container';
import {scaleDp} from 'helpers/responsiveHelper';
import {Row} from 'components/ui/Row';
import InputField from 'components/ui/InputField';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {MainButton} from 'components/ui/MainButton';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {routes} from 'constants/config/routes';
import IdCardImage from 'resources/images/id-card.svg';
import DriverLicenceImage from 'resources/images/driver-license.svg';
import {
  receiveRegisterFail,
  registerDriverLegaleData,
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
  const [isSubmited, setIsSubmited] = useState(false);

  const onSubmit = useCallback(
    values => {
      dispatch(registerDriverLegaleData(values));
      setIsSubmited(true);
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

  useEffect(() => {
    if (isSubmited && !isLoading && !error) {
      setIsSubmited(false);
      navigation.navigate(routes.registerDriverCompleteScreen);
    }
  }, [isSubmited, isLoading, error]);

  return (
    <Screen scrollable>
      <ScreenContainer>
        <IconCard
          renderImage={size => <IdCardImage height={size} width={size} />}>
          <AppText padding={5} bold color={theme.white}>
            DNI
          </AppText>
          <SelectImage
            label="Frente"
            value={values[FIELDS.DOCUMENT_FRONT]}
            error={
              touched[FIELDS.DOCUMENT_FRONT] && errors[FIELDS.DOCUMENT_FRONT]
            }
            onSelectImage={_setFieldValue(FIELDS.DOCUMENT_FRONT)}
          />
          <SelectImage
            label="Dorso"
            value={values[FIELDS.DOCUMENT_BACK]}
            error={
              touched[FIELDS.DOCUMENT_BACK] && errors[FIELDS.DOCUMENT_BACK]
            }
            onSelectImage={_setFieldValue(FIELDS.DOCUMENT_BACK)}
          />
        </IconCard>
        <IconCard
          reverse
          renderImage={size => (
            <DriverLicenceImage height={size} width={size} />
          )}>
          <AppText padding={5} bold color={theme.white}>
            Licencia
          </AppText>
          <SelectImage
            label="Frente"
            value={values[FIELDS.LICENSE_FRONT]}
            error={
              touched[FIELDS.LICENSE_FRONT] && errors[FIELDS.LICENSE_FRONT]
            }
            onSelectImage={_setFieldValue(FIELDS.LICENSE_FRONT)}
          />
          <SelectImage
            label="Dorso"
            value={values[FIELDS.LICENSE_BACK]}
            error={touched[FIELDS.LICENSE_BACK] && errors[FIELDS.LICENSE_BACK]}
            onSelectImage={_setFieldValue(FIELDS.LICENSE_BACK)}
          />
        </IconCard>
        <Row>
          <SelectImage
            style={{width: '49%', marginTop: 10}}
            label="Seguro"
            value={values[FIELDS.INSURANCE]}
            error={touched[FIELDS.INSURANCE] && errors[FIELDS.INSURANCE]}
            onSelectImage={_setFieldValue(FIELDS.INSURANCE)}
          />
          <InputField style={{width: '49%'}} label="Vencimiento" />
        </Row>

        <SelectImage
          label="Foto del libre antecedentes"
          value={values[FIELDS.BACKGROUND]}
          error={touched[FIELDS.BACKGROUND] && errors[FIELDS.BACKGROUND]}
          onSelectImage={_setFieldValue(FIELDS.BACKGROUND)}
        />
        <SelectImage
          label={'Pago de servicios o monotributo'}
          value={values[FIELDS.ADDRESS_VALIDATION]}
          error={
            touched[FIELDS.ADDRESS_VALIDATION] &&
            errors[FIELDS.ADDRESS_VALIDATION]
          }
          onSelectImage={_setFieldValue(FIELDS.ADDRESS_VALIDATION)}
        />
        <MainButton
          loading={isLoading}
          label="Finalizar"
          onPress={handleSubmit}
          style={{
            width: scaleDp(250),
            alignSelf: 'center',
          }}
        />
      </ScreenContainer>
    </Screen>
  );
};

const ScreenContainer = styled.View`
  padding: 0 20px 10px;
  align-items: center;
  width: 100%;
  min-height: ${({theme}) => theme.screenHeight}px;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding: 20px 0;
      width: 414px;
      align-self: center;
    `}
`;

const Title = styled(AppText)`
  padding-top: ${props => scaleDp(props.theme.isMobile ? 60 : 10)}px;
  padding-bottom: ${props => scaleDp(props.theme.isMobile ? 90 : 10)}px;
  text-align: center;
`;
