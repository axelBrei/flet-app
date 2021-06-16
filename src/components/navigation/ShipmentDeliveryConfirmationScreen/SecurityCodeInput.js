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
}) => {
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    if (value.length === digits) {
      onCompleteEnterCode(value);
    }
  }, [value, onCompleteEnterCode, digits]);

  return (
    <Container
      onPress={() => hiddenInputRef.current?.focus()}
      activeOpacity={1}>
      {new Array(digits).fill(null).map((_, i) => (
        <CharacterContainer>
          <CharacterInput
            pointerEvents="none"
            keyboardType="numeric"
            returnKeyType={i + 1 === digits ? 'done' : null}>
            {value[i]}
          </CharacterInput>
        </CharacterContainer>
      ))}
      <HiddenInput
        ref={hiddenInputRef}
        onChangeText={onChangeValue}
        value={value}
        maxLength={digits}
        keyboardType="numeric"
      />
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

const Container = styled.TouchableOpacity`
  padding: 15px 0;
  width: 100%;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin: 35px 0 0;
`;

const CharacterContainer = styled.View`
  width: 65px;
  height: 65px;
  border-radius: 33px;
  background-color: ${theme.primaryOpacity};
  align-items: center;
  justify-content: center;
`;

const CharacterInput = styled(AppText)`
  color: ${theme.primaryColor};
  text-align: center;
  font-size: 24px;
`;

const HiddenInput = styled.TextInput`
  height: 1px;
  width: 1px;
`;
