import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import InputField from 'components/ui/InputField';
import {Row} from 'components/ui/Row';
import {MainButton} from 'components/ui/MainButton';
import {Title} from 'components/ui/Title';
import {useModalContext} from 'components/Hooks/useModal';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import * as yup from 'yup';
import {strings} from 'constants/strings';
import {Icon} from 'components/ui/Icon';
import {TouchableOpacity} from 'react-native';

const minString = 'Debe ser mayor a ${min}';
const maxString = 'Debe ser mayor a ${max}';
export default ({onPressAccept, initialValue}) => {
  const {closeModal} = useModalContext();

  const _onPressAccept = useCallback(
    values => {
      onPressAccept(values);
      closeModal();
    },
    [onPressAccept],
  );

  const {values, errors, handleSubmit, _setFieldValue} = useFormikCustom({
    onSubmit: _onPressAccept,
    initialValues: {
      hour: initialValue?.hour || '',
      minute: initialValue?.minute || '30',
    },
    validationSchema: yup.object({
      hour: yup
        .number()
        .min(0, minString)
        .max(24, maxString)
        .required(strings.validations.requiredField),
      minute: yup
        .number()
        .min(0, minString)
        .max(59, maxString)
        .required(strings.validations.requiredField),
    }),
  });

  return (
    <Container>
      <Row>
        <Title>Seleccioná un horario</Title>
        <TouchableOpacity onPress={closeModal}>
          <Icon name="close" size={20} color={theme.fontColor} />
        </TouchableOpacity>
      </Row>
      <Row>
        <InputField
          keyboardType="numeric"
          label="Hora"
          style={{width: '49%'}}
          onChangeText={_setFieldValue('hour')}
          value={values.hour}
          error={errors.hour}
        />
        <InputField
          keyboardType="numeric"
          label="Minutos"
          style={{width: '49%'}}
          onChangeText={_setFieldValue('minute')}
          value={values.minute}
          error={errors.minute}
        />
      </Row>
      <Button onPress={handleSubmit}>Aceptar</Button>
    </Container>
  );
};

const Container = styled.View`
  width: ${props =>
    props.theme.isMobile ? `${props.theme.screenWidth}px` : '100%'};
  padding: 20px 20px 90px;
  background-color: ${theme.white};
`;

const Button = styled(MainButton)`
  align-self: center;
  width: 100%;
`;
