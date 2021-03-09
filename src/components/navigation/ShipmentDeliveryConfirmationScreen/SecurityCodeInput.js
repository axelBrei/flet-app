import React, {useRef, useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import {View, TextInput} from 'react-native';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import PropTypes from 'prop-types';

export const SecurityCodeInput = ({
  value,
  onChangeValue = () => {},
  onCompleteEnterCode,
  digits = 5,
}) => {
  let [values, setValues] = useState(
    new Array(digits).fill(null).map((_) => ''),
  );
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
    <InputContainer>
      {new Array(digits).fill(null).map((_, i) => (
        <CharacterInput
          value={values[i]}
          ref={refList[i]}
          onKeyPress={onKeyPress(i)}
          onChangeText={onChangeText(i)}
        />
      ))}
    </InputContainer>
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

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CharacterInput = styled(TextInput)`
  width: ${scaleDpTheme(35)};
  border: 1px solid ${theme.fontColor};
  margin: ${scaleDpTheme(5)} ${scaleDpTheme(10)};
  text-align: center;
  font-size: ${scaleDpTheme(22)};
  padding: ${scaleDpTheme(12)} 0;
  border-radius: ${scaleDpTheme(8)};
`;
