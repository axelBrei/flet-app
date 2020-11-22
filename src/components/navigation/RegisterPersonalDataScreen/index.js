import React, {useCallback} from 'react';
import {Screen} from 'components/ui/Screen';
import {Card} from 'components/ui/Card';
import {StyleSheet, Platform} from 'react-native';
import InputField from 'components/ui/InputField/index';
import {scaleDp} from 'helpers/responsiveHelper';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {
  personalDataFormikConfig,
  REGISTER_PERSONAL_DATA_FIELDS as FIELDS,
} from 'components/navigation/RegisterPersonalDataScreen/formikConfig';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {routes} from 'constants/config/routes';
import {useDispatch} from 'react-redux';
import {saveRegisterData} from 'redux-store/slices/registerSlice';

export default ({navigation}) => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values) => {
      navigation.navigate(routes.registerAccountDataScreen);
      dispatch(
        saveRegisterData({
          step: 'personal',
          values,
        }),
      );
    },
    [dispatch, navigation],
  );

  const {
    values,
    errors,
    touched,
    handleSubmit,
    _setFieldValue,
    _setFieldTouched,
  } = useFormikCustom(personalDataFormikConfig(onSubmit));

  return (
    <Screen style={styles.screen}>
      <Card>
        <InputField
          label="Nombre"
          value={values[FIELDS.NAME]}
          onChangeText={_setFieldValue(FIELDS.NAME)}
          onBlur={_setFieldTouched(FIELDS.NAME)}
          error={touched[FIELDS.NAME] && errors[FIELDS.NAME]}
        />
        <InputField
          label="Apellido"
          value={values[FIELDS.LAST_NAME]}
          onChangeText={_setFieldValue(FIELDS.LAST_NAME)}
          onBlur={_setFieldTouched(FIELDS.LAST_NAME)}
          error={touched[FIELDS.LAST_NAME] && errors[FIELDS.LAST_NAME]}
        />
        <InputField
          label="Teléfono"
          value={values[FIELDS.PHONE]}
          onChangeText={_setFieldValue(FIELDS.PHONE)}
          onBlur={_setFieldTouched(FIELDS.PHONE)}
          error={touched[FIELDS.PHONE] && errors[FIELDS.PHONE]}
        />
        <InputField
          label="Email"
          value={values[FIELDS.MAIL]}
          onChangeText={_setFieldValue(FIELDS.MAIL)}
          onBlur={_setFieldTouched(FIELDS.MAIL)}
          error={touched[FIELDS.MAIL] && errors[FIELDS.MAIL]}
        />
        <MainButton
          style={styles.button}
          label="Siguiente"
          onPress={handleSubmit}
        />
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: scaleDp(Platform.OS === 'web' ? 100 : 20),
  },
  button: {
    height: scaleDp(40),
    marginTop: scaleDp(40),
  },
});
