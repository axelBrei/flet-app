import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import InputField from 'components/ui/InputField';
import {Row} from 'components/ui/Row';
import {MainButton} from 'components/ui/MainButton';
import {Title} from 'components/ui/Title';
import {useModalContext} from 'components/Hooks/useModal';

export default ({onPressAccept}) => {
  const {closeModal} = useModalContext();
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const _onPressAccept = useCallback(() => {
    onPressAccept({hour, minute});
    closeModal();
  }, [onPressAccept, hour, minute]);

  return (
    <Container>
      <Title>Seleccioná un horario</Title>
      <Row>
        <InputField
          style={{width: '49%'}}
          onChangeText={setHour}
          label="Hora"
          value={hour}
        />
        <InputField
          style={{width: '49%'}}
          onChangeText={setMinute}
          label="Minutos"
          value={minute}
        />
      </Row>
      <MainButton onPress={_onPressAccept}>Aceptar</MainButton>
    </Container>
  );
};

const Container = styled.View`
  width: ${props =>
    props.theme.isMobile ? `${props.theme.screenWidth}px` : '100%'};
  padding: 20px 20px 90px;
  background-color: ${theme.white};
`;
