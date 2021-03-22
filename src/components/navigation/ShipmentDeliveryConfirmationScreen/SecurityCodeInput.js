import React, {useRef, useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import {TextInput} from 'react-native';
import {MainButton} from 'components/ui/MainButton';
import {theme} from 'constants/theme';
import PropTypes from 'prop-types';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {Loader} from 'components/ui/Loader';
import {useSelector} from 'react-redux';
import {selectIsLoadingSecureCode} from 'redux-store/slices/driverShipmentSlice';

export const SecurityCodeInput = ({
  value,
  onChangeValue = () => {},
  onCompleteEnterCode,
  digits = 5,
  onPressAccept,
}) => {
  let [values, setValues] = useState(
    new Array(digits).fill(null).map((_) => ''),
  );
  const loading = useSelector(selectIsLoadingSecureCode);
  const refList = new Array(digits).fill(null).map(useRef);

  useEffect(() => {
    onChangeValue(values.join(''));
    if (values.every((i) => i !== '')) {
      onCompleteEnterCode(values.join(''));
    }
  }, [values]);

  useEffect(() => {
    if (value) {
      setValues(value.split(''));
    }
  }, [value]);

  const onKeyPress = useCallback(
    (i) => (e) => {
      const valuesArray = Array.from(values);
      if (i > 0 && !values[i] && e.code === 'Backspace') {
        refList[i - 1]?.current?.focus();
        valuesArray.splice(i - 1, 1, '');
        setValues(valuesArray);
      }
    },
    [values, refList],
  );

  const onChangeText = useCallback(
    (i) => (text) => {
      const valuesArray = Array.from(values);
      if (i === digits - 1 && text.length > 1) {
        return;
      }

      if (i + 1 < digits && text !== '') {
        refList[i + 1]?.current?.focus();
      }

      valuesArray.splice(i, 1, text);
      setValues(valuesArray);
    },
    [values, refList],
  );

  return (
    <Container>
      <PaddinglesTitle alternative>Código de seguridad</PaddinglesTitle>
      <AppText alternative fontSize={12}>
        Pedile este código a la persona que recibe el paquete
      </AppText>
      <InputContainer>
        {new Array(digits).fill(null).map((_, i) => (
          <CharacterInput
            value={values[i]}
            ref={refList[i]}
            onKeyPress={onKeyPress(i)}
            onChangeText={onChangeText(i)}
            keyboardType="numeric"
          />
        ))}
      </InputContainer>
      <Button
        inverted
        onPress={onPressAccept}
        loading={loading}
        loaderColor={theme.white}>
        Confirmar envío
      </Button>
    </Container>
  );
};

SecurityCodeInput.defaultProps = {
  value: null,
  onChangeValue: () => {},
  onCompleteEnterCode: () => {},
  digits: 5,
};

SecurityCodeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func,
  onCompleteEnterCode: PropTypes.func,
  digits: PropTypes.number,
};

const Container = styled.View`
  padding: 15px;
  background-color: ${theme.primaryColor};
  border-radius: 20px;
  justify-content: center;
`;

const PaddinglesTitle = styled(Title)`
  margin-bottom: 0px;
  line-height: 20px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
`;

const CharacterInput = styled(TextInput)`
  width: 50px;
  background-color: ${theme.grayBackground};
  text-align: center;
  font-size: 24px;
  padding: 20px 0;
  border-radius: 15px;
`;

const Button = styled(MainButton)`
  margin: 20px 0;
`;
