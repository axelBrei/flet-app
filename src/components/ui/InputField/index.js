import React, {useState, useCallback, useRef} from 'react';
import {Platform, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {AnimatedBorder} from 'components/ui/InputField/AnimatedBorder';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AnimatedLabel} from 'components/ui/AnimatedLabel';
import {AnimatedError} from 'components/ui/AnimatedError';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';

const InputFiled = ({label, error, onFocus, onBlur, icon, ...props}) => {
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
    <>
      <Container onFocus={_onFocus} onBlur={_onBlur} error={error}>
        {!!icon && (
          <Icon
            name={icon}
            size={scaleDp(20)}
            color={theme.primaryLightColor}
          />
        )}
        <Input
          ref={inputRef}
          onBlur={_onBlur}
          onFocus={_onFocus}
          {...props}
          placeholder={label}
        />
      </Container>
      <AnimatedError error={error} />
    </>
  );
};
export default InputFiled;

const Container = styled(View)`
  width: 100%;
  align-items: center;
  padding-left: ${scaleDpTheme(10)};
  flex-direction: row;
  margin-top: ${scaleDpTheme(5)};
  background-color: white;
  border-color: ${(props) => (props.error ? theme.error : 'transparent')};
  border-width: ${(props) => (props.error ? 1 : 0)}px;
  border-radius: 12px;
  box-shadow: 0.5px 1px 2px ${theme.disabled};
  elevation: 3;
`;

const Input = styled(TextInput)`
  color: ${(props) => props.theme.colors.fontColor};
  min-width: ${scaleDpTheme(150)};
  width: 100%;
  color: black;
  font-size: ${scaleDp(
    Platform.select({
      native: 12,
    }),
  )}px;
  padding-top: ${scaleDpTheme(15)};
  padding-bottom: ${scaleDpTheme(15)};
  padding-left: ${scaleDpTheme(10)};
`;
