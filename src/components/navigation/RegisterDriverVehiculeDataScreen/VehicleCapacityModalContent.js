import React from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';
import {IconCard} from 'components/ui/IconCard';
import BoxImage from 'resources/images/open-box.svg';
import WeightImage from 'resources/images/weight.svg';
import InputField from 'components/ui/InputField';
import {useModalContext} from 'components/Hooks/useModal';
import {MainButton} from 'components/ui/MainButton';
import {FIELDS} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';

export const VehicleCapacityModalContent = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  const {closeModal} = useModalContext();

  console.log('modal content', values.length);
  const onPressAccept = () => {
    if (!errors) {
      closeModal();
    }
  };

  return (
    <Container>
      <Title width="100%" textAlign="left">
        Capacidad de carga
      </Title>
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
