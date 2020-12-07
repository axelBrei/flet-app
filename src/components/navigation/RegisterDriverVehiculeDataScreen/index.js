import React, {useCallback} from 'react';
import {Screen} from 'components/ui/Screen';
import styled from 'styled-components';
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

export default ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const onSubmit = useCallback(() => {
    // TODO: save data on redux and navigate to next screen
  }, [navigation]);

  const {
    values,
    errors,
    touched,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
  } = useFormikCustom(vehiculeDataFormikConfig(onSubmit));

  return (
    <ScreenContainer scrollable={isMobile}>
      <Title bold fontSize={20}>
        Necesitamos algunos datos del vehículo
      </Title>
      <Container
        alignItems="center"
        style={
          !isMobile && {
            maxWidth: scaleDp(320),
            alignSelf: 'center',
          }
        }>
        <InputField
          label="Patente"
          icon="card-account-details-outline"
          value={values[FIELDS.PLATE]}
          onFocus={_setFieldTouched(FIELDS.PLATE)}
          onChangeText={_setFieldValue(FIELDS.PLATE)}
          error={touched[FIELDS.PLATE] && errors[FIELDS.PLATE]}
        />
        <InputField
          label="Modelo"
          icon="car"
          value={values[FIELDS.MODEL]}
          onFocus={_setFieldTouched(FIELDS.MODEL)}
          onChangeText={_setFieldValue(FIELDS.MODEL)}
          error={touched[FIELDS.MODEL] && errors[FIELDS.MODEL]}
        />
        <InputField
          label="Año del vehículo"
          icon="calendar"
          value={values[FIELDS.YEAR]}
          onFocus={_setFieldTouched(FIELDS.YEAR)}
          onChangeText={_setFieldValue(FIELDS.YEAR)}
          error={touched[FIELDS.YEAR] && errors[FIELDS.YEAR]}
        />
        <InputField
          label="Color del vehículo"
          icon="format-paint"
          value={values[FIELDS.COLOR]}
          onFocus={_setFieldTouched(FIELDS.COLOR)}
          onChangeText={_setFieldValue(FIELDS.COLOR)}
          error={touched[FIELDS.COLOR] && errors[FIELDS.COLOR]}
        />
        <SelectImage
          label="Foto de la cédula verde o azul (Frente)"
          value={values[FIELDS.LICENSE_FRONT]}
          onSelectImage={_setFieldValue(FIELDS.LICENSE_FRONT)}
          error={touched[FIELDS.LICENSE_FRONT] && errors[FIELDS.LICENSE_FRONT]}
        />
        <SelectImage
          label="Foto de la cédula verde o azul (Dorso)"
          value={values[FIELDS.LICENSE_BACK]}
          onSelectImage={_setFieldValue(FIELDS.LICENSE_BACK)}
          error={touched[FIELDS.LICENSE_BACK] && errors[FIELDS.LICENSE_BACK]}
        />
        <MainButton
          onPress={handleSubmit}
          label="Continuar"
          style={{width: scaleDp(250)}}
        />
        <MainButton
          onPress={handleSubmit}
          label="Continuar"
          style={{width: scaleDp(250)}}
        />
      </Container>
    </ScreenContainer>
  );
};

const ScreenContainer = styled(Screen)`
  padding-top: ${scaleDpTheme(20)};
  padding-left: ${scaleDpTheme(25)};
  padding-right: ${scaleDpTheme(25)};
`;

const Title = styled(AppText)`
  padding-bottom: ${scaleDpTheme(10)};
  text-align: center;
`;
