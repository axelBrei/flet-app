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
} from 'redux-store/slices/newShipmentSlice';
import {routes} from 'constants/config/routes';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export default ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const dispatch = useDispatch();
  const {
    shipmentDescription: {startPoint, endPoint},
  } = useSelector(selectNewShipmentData);

  const onSubmit = useCallback(
    (values) => {
      const {[FIELDS.WEIGHT]: weight, ...rest} = values;
      dispatch(
        updateShipmentDescription({
          ...rest,
          [FIELDS.VALUE]: parseInt(values[FIELDS.VALUE]),
          [FIELDS.WEIGHT]: parseInt(values[FIELDS.WEIGHT]),
        }),
      );
      navigation.navigate(routes.newShipmentDetailScreen);
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
  } = useFormikCustom(formikConfig(onSubmit));

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
        <IconCard
          renderImage={(size) => <OpenBoxImage height={size} width={size} />}>
          <Input
            label="Alto"
            unitString="(Cm)"
            value={values[FIELDS.HEIGHT]}
            onChangeText={_setFieldValue(FIELDS.HEIGHT)}
            onFocus={_setFieldTouched(FIELDS.HEIGHT)}
            error={touched[FIELDS.HEIGHT] && errors[FIELDS.HEIGHT]}
            keyboardType="numeric"
          />
          <Input
            label="Ancho"
            unitString="(Cm)"
            value={values[FIELDS.WIDTH]}
            onChangeText={_setFieldValue(FIELDS.WIDTH)}
            onFocus={_setFieldTouched(FIELDS.WIDTH)}
            error={touched[FIELDS.WIDTH] && errors[FIELDS.WIDTH]}
            keyboardType="numeric"
          />
          <Input
            label="Largo"
            unitString="(Cm)"
            value={values[FIELDS.LENGTH]}
            onChangeText={_setFieldValue(FIELDS.LENGTH)}
            onFocus={_setFieldTouched(FIELDS.LENGTH)}
            error={touched[FIELDS.LENGTH] && errors[FIELDS.LENGTH]}
            keyboardType="numeric"
          />
        </IconCard>
        <IconCard
          reverse
          renderImage={(size) => <WeightImage height={size} width={size} />}>
          <Input
            label="¿Cuanto pesa?"
            unitString="(Kg)"
            value={values[FIELDS.WEIGHT]}
            onChangeText={_setFieldValue(FIELDS.WEIGHT)}
            onFocus={_setFieldTouched(FIELDS.WEIGHT)}
            error={touched[FIELDS.WEIGHT] && errors[FIELDS.WEIGHT]}
            keyboardType="numeric"
          />
          <WeightDisclaimer>
            Necesitamos saber el peso para decirle al conductor
          </WeightDisclaimer>
        </IconCard>
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
  height: ${(props) => props.theme.screenHeight * 0.25}px;
  width: ${(props) => props.theme.screenWidth - 40}px;
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

const WeightDisclaimer = styled(AppText)`
  color: ${theme.white};
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
`;

const Button = styled(MainButton)`
  margin: 20px;
`;

const Input = styled(InputField)`
  margin: 5px 0;
`;
