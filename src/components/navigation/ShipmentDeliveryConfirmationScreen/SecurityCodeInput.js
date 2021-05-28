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
import {current} from '@reduxjs/toolkit';

export const SecurityCodeInput = ({
  value,
  onChangeValue = () => {},
  onCompleteEnterCode,
  digits = 5,
  onPressAccept,
}) => {
  let [values, setValues] = useState(new Array(digits).fill(null).map(_ => ''));
  const loading = useSelector(selectIsLoadingSecureCode);
  const refList = new Array(digits).fill(null).map(useRef);

  // useEffect(() => {
  //   refList?.[0]?.current?.focus();
  // }, [refList]);

  useEffect(() => {
    onChangeValue(values.join(''));
    if (values.every(i => i !== '')) {
      onCompleteEnterCode(values.join(''));
    }
  }, [values]);

  useEffect(() => {
    if (value) {
      setValues(value.split(''));
    }
  }, [value]);

  const onKeyPress = useCallback(
    i => ({nativeEvent, ...e}) => {
      const valuesArray = Array.from(values);
      if ((e?.code || nativeEvent.key) === 'Backspace') {
        i > 0 && refList[i - 1]?.current?.focus();
        valuesArray.splice(i - 1, 1, '');
        1;
      } else if (/[0-9]/.test(e?.code || nativeEvent.key)) {
        valuesArray.splice(i, 1, nativeEvent.key);
        i + 1 < digits && refList[i + 1]?.current?.focus();
      }
      setValues(valuesArray);
    },
    [values, refList, setValues],
  );

  return (
    <Container>
      {new Array(digits).fill(null).map((_, i) => (
        <CharacterInput
          value={values[i]}
          ref={refList[i]}
          onKeyPress={onKeyPress(i)}
          keyboardType="numeric"
          returnKeyType={i + 1 === digits ? 'done' : null}
        />
      ))}
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
  padding: 15px 0;
  width: 100%;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin: 35px 0 0;
`;

const CharacterInput = styled(TextInput)`
  width: 65px;
  height: 65px;
  background-color: ${theme.primaryOpacity};
  color: ${theme.primaryColor};
  text-align: center;
  font-size: 24px;
  padding: 20px 0;
  border-radius: 33px;
`;
