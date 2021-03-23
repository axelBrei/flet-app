import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';
import {IconCard} from 'components/ui/IconCard';
import BoxImage from 'resources/images/open-box.svg';
import WeightImage from 'resources/images/weight.svg';
import InputField from 'components/ui/InputField';
import {useModalContext} from 'components/Hooks/useModal';
import {MainButton} from 'components/ui/MainButton';
import {Dropdown} from 'components/ui/Dropdown';
import {FIELDS} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchVehicleTypes,
  selectLoadingVehicleTypes,
  selectVehicleTypes,
  selectVehicleTypesError,
} from 'redux-store/slices/vehicleTypesSlice';

export const VehicleCapacityModalContent = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  const {closeModal} = useModalContext();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoadingVehicleTypes);
  const error = useSelector(selectVehicleTypesError);
  const vehicleTypes = useSelector(selectVehicleTypes);

  useEffect(() => {
    dispatch(fetchVehicleTypes());
  }, []);

  const onPressAccept = () => {
    if (
      !errors[FIELDS.HEIGHT] &&
      !errors[FIELDS.WIDTH] &&
      !errors[FIELDS.LENGTH] &&
      !errors[FIELDS.WEIGHT] &&
      !errors[FIELDS.VEHICLE_TYPE]
    ) {
      closeModal();
    }
  };

  console.log(errors);

  return (
    <Container>
      <Title width="100%" textAlign="left">
        Capacidad de carga
      </Title>
      <Dropdown
        loading={isLoading}
        label="Tipo de vehiculo"
        value={values[FIELDS.VEHICLE_TYPE]}
        onItemPress={setFieldValue(FIELDS.VEHICLE_TYPE)}
        onFocus={setFieldTouched(FIELDS.VEHICLE_TYPE)}
        data={vehicleTypes}
        error={
          error || (touched[FIELDS.VEHICLE_TYPE] && errors[FIELDS.VEHICLE_TYPE])
        }
      />
      <IconCard renderImage={(size) => <BoxImage height={size} width={size} />}>
        <Input
          label="Alto"
          unitString="Cm."
          keyboardType="numeric"
          value={values[FIELDS.HEIGHT]}
          onBlur={setFieldTouched(FIELDS.HEIGHT)}
          onChangeText={setFieldValue(FIELDS.HEIGHT)}
          error={touched[FIELDS.HEIGHT] && errors[FIELDS.HEIGHT]}
        />
        <Input
          label="Ancho"
          unitString="Cm."
          keyboardType="numeric"
          value={values[FIELDS.WIDTH]}
          onBlur={setFieldTouched(FIELDS.WIDTH)}
          onChangeText={setFieldValue(FIELDS.WIDTH)}
          error={touched[FIELDS.WIDTH] && errors[FIELDS.WIDTH]}
        />
        <Input
          label="Largo"
          unitString="Cm."
          keyboardType="numeric"
          value={values[FIELDS.LENGTH]}
          onBlur={setFieldTouched(FIELDS.LENGTH)}
          onChangeText={setFieldValue(FIELDS.LENGTH)}
          error={touched[FIELDS.LENGTH] && errors[FIELDS.LENGTH]}
        />
      </IconCard>
      <IconCard
        reverse
        renderImage={(size) => <WeightImage height={size} width={size} />}>
        <Input
          label="Peso máximo"
          unitString="Kg."
          keyboardType="numeric"
          value={values[FIELDS.WEIGHT]}
          onBlur={setFieldTouched(FIELDS.WEIGHT)}
          onChangeText={setFieldValue(FIELDS.WEIGHT)}
          error={touched[FIELDS.WEIGHT] && errors[FIELDS.WEIGHT]}
        />
      </IconCard>
      <Button onPress={onPressAccept}>Aceptar</Button>
    </Container>
  );
};

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Input = styled(InputField)`
  margin-bottom: 5px;
`;
const Button = styled(MainButton)`
  margin: 30px 20px 20px;
  width: 100%;
`;
