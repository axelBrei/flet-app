import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {RadioGroup} from 'components/ui/RadioGroup';
import InputField from 'components/ui/InputField';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Container} from 'components/ui/Container';
import {FlatList} from 'react-native';
import {VehiculeSizeItem} from 'components/navigation/NewShipmentDetailsScreen/VehiculeSizeItem';
import Motorbike from 'resources/assets/motorbike.svg';
import Car from 'resources/assets/car.svg';
import Pickup from 'resources/assets/camioneta.svg';
import Truck from 'resources/assets/truck.svg';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {MainButton} from 'components/ui/MainButton';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/NewShipmentDetailsScreen/orderShippmentDetailsFormikConfig';
import {routes} from 'constants/config/routes';
import {useDispatch} from 'react-redux';
import {updateShipmentVehiculeData} from 'redux-store/slices/newShipmentSlice';

const vehiculeSizeOptions = [
  {
    id: 1,
    title: 'Moto',
    maxWeight: 5,
    Icon: Motorbike,
  },
  {
    id: 2,
    title: 'Auto',
    maxWeight: 70,
    Icon: Car,
  },
  {
    id: 3,
    title: 'Camioneta',
    maxWeight: 120,
    Icon: Pickup,
  },
  {
    id: 4,
    title: 'Camión',
    maxWeight: 500,
    Icon: Truck,
  },
];

const extraHelpOptions = [
  {text: 'Sí, quiero que el conductor me ayude', value: true},
  {text: 'No, no hace falta', value: false},
];

export default ({navigation}) => {
  const dispatch = useDispatch();
  const {isMobile} = useWindowDimension();

  const onSubmit = useCallback(
    (values) => {
      delete values[FIELDS.SIZE]?.Icon;
      const {[FIELDS.EXTRA_HELP]: extraHelp, ...rest} = values;
      dispatch(
        updateShipmentVehiculeData({
          ...rest,
          [FIELDS.EXTRA_HELP]: extraHelp.value,
        }),
      );
      navigation.navigate(routes.newShipmentConfirmationScreen);
    },
    [navigation, dispatch],
  );

  const {
    values,
    errors,
    touched,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
  } = useFormikCustom(
    formikConfig(onSubmit, {
      [FIELDS.SIZE]: vehiculeSizeOptions[0],
      [FIELDS.EXTRA_HELP]: extraHelpOptions[1],
    }),
  );

  const renderVehiculeSize = useCallback(
    (item, idx) => (
      <VehiculeSizeItem
        key={idx}
        selected={values[FIELDS.SIZE]?.id === item.id}
        onPress={_setFieldValue(FIELDS.SIZE)}
        {...item}
      />
    ),
    [values, _setFieldValue],
  );

  return (
    <Screen scrollable>
      <FormContainer>
        <Title>¿Que tamaño de vehículo necesitas?</Title>
        {vehiculeSizeOptions.map(renderVehiculeSize)}
        <Title>¿Necesitas una mano?</Title>
        <RadioGroup
          initialIndex={1}
          style={{
            marginLeft: scaleDp(10),
          }}
          options={extraHelpOptions}
          onPressOption={_setFieldValue(FIELDS.EXTRA_HELP)}
        />
        <Title>¿Queres agregar alguna observación?</Title>
        <CommentText
          multiline
          value={values[FIELDS.COMMENTS]}
          error={touched[FIELDS.COMMENTS] && errors[FIELDS.COMMENTS]}
          onFocus={_setFieldTouched(FIELDS.COMMENTS)}
          onChangeText={_setFieldValue(FIELDS.COMMENTS)}
          label="Ingresá aca tu observación"
          style={{marginTop: scaleDp(10)}}
        />
        <Button label="Continuar" onPress={handleSubmit} />
      </FormContainer>
    </Screen>
  );
};

const FormContainer = styled(Container)`
  width: ${(props) =>
    props.theme.isMobile ? props.theme.screenWidth : scaleDp(350)}px;
  padding: ${scaleDpTheme(30)} ${scaleDpTheme(20)};
  ${(props) => props.theme.isMobile && 'padding-top: 0px;'}
`;

const Title = styled(AppText)`
  margin-top: ${scaleDpTheme(15)};
  margin-bottom: ${scaleDpTheme(5)};
  font-size: ${scaleDpTheme(16)};
  font-weight: bold;
`;

const CommentText = styled(InputField)`
  height: ${scaleDpTheme(80)};
  margin-bottom: ${scaleDpTheme(15)};
`;

const Button = styled(MainButton)`
  align-self: center;
  margin-top: ${scaleDpTheme(25)};
`;
