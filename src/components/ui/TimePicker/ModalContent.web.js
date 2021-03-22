import React from 'react';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import InputField from 'components/ui/InputField';
import {Row} from 'components/ui/Row';
import {MainButton} from 'components/ui/MainButton';
import {Title} from 'components/ui/Title';

export default () => {
  return (
    <Container>
      <Title>Seleccioná un horario</Title>
      <Row>
        <InputField style={{width: '49%'}} label="Hora" />
        <InputField style={{width: '49%'}} label="Minutos" />
      </Row>
      <MainButton>Aceptar</MainButton>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  padding: 20px 20px 90px;
`;
