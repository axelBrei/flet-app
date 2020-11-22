import React, {useState, useCallback, useRef} from 'react';
import {Platform, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {AnimatedBorder} from 'components/ui/InputField/AnimatedBorder';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AnimatedLabel} from 'components/ui/AnimatedLabel';
import {AnimatedError} from 'components/ui/AnimatedError';

const InputFiled = ({label, error, onFocus, onBlur, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const _onFocus = useCallback(() => {
    setIsFocused(true);
    inputRef.current?.focus();
    typeof onFocus === 'function' && onFocus();
  }, [onFocus, setIsFocused, inputRef]);

  const _onBlur = useCallback(() => {
    setIsFocused(false);
    inputRef.current?.blur();
    typeof onBlur === 'function' && onBlur();
  }, [onFocus, setIsFocused, inputRef]);

  return (
    <Container onFocus={_onFocus} onBlur={_onBlur}>
      <AnimatedLabel
        error={!!error}
        focused={isFocused || props.value}
        label={label}
        onPress={isFocused ? _onBlur : _onFocus}
      />
      <Input ref={inputRef} onBlur={_onBlur} onFocus={_onFocus} {...props} />
      <AnimatedBorder focused={isFocused} error={error} />
      <AnimatedError error={error} />
    </Container>
  );
};
export default (props) => {
  return <InputFiled {...props} />;
};

const Container = styled(View)`
  margin-top: ${scaleDpTheme(5)};
`;

const Input = styled(TextInput)`
  color: ${(props) => props.theme.colors.fontColor};
  min-width: ${scaleDpTheme(150)};
  width: 100%;
  padding: 0;
  padding-left: ${scaleDpTheme(5)};
  color: black;
  font-size: ${scaleDp(
    Platform.select({
      native: 12,
      web: 10,
    }),
  )}px;
  height: ${Platform.select({
    native: scaleDp(25),
    web: scaleDp(20),
  })}px;
`;
