import React from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {Container} from 'components/ui/Container';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {Slider} from 'components/ui/Slider';
import {AppText} from 'components/ui/AppText';

const options = [
  {label: 'Chico'},
  {label: 'Mediano'},
  {label: 'Grande'},
  {label: 'Muy grande'},
];
export const OrderForm = () => {
  return (
    <FormContainer>
      <Title>Datos de la encomienda</Title>
      <InputField label="¿De donde salimos?" icon="notification-clear-all" />
      <InputField label="¿A donde lo llevamos?" icon="map-marker-outline" />
      <InputField
        label="¿Que estamos llevando?"
        icon="package-variant-closed"
      />
      <Slider
        minValue={1000}
        maxValue={100000}
        showValue
        label="¿Cuanto vale lo que estamos llevando?"
      />
      <Slider options={options} label="¿Que tan grande es?" stepsEnabled />
      <MainButton label="Continuar" />
    </FormContainer>
  );
};

const FormContainer = styled(Container)`
  padding: ${scaleDpTheme(15)} 0;
  align-items: center;
`;

const Title = styled(AppText)`
  width: 100%;
  text-align: left;
  padding-bottom: ${scaleDpTheme(15)};
  font-size: ${scaleDpTheme(18)};
`;
