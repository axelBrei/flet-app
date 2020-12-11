import React from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {Container} from 'components/ui/Container';
import {scaleDpTheme} from 'helpers/responsiveHelper';

export const OrderForm = () => {
  return (
    <FormContainer>
      <InputField label="¿De donde salimos?" />
      <InputField label="¿A donde lo llevamos?" />
      <MainButton label="Continuar" />
    </FormContainer>
  );
};

const FormContainer = styled(Container)`
  padding: ${scaleDpTheme(15)} 0;
  align-items: center;
`;
