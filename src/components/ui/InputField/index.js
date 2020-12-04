import React, {useCallback, useRef} from 'react';
import {Platform, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AnimatedError} from 'components/ui/AnimatedError';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';

const InputField = ({
  label,
  error,
  onFocus,
  onBlur,
  icon,
  clearable,
  ...props
}) => {
  const inputRef = useRef(null);

  const _onFocus = useCallback(() => {
    inputRef.current?.focus();
    typeof onFocus === 'function' && onFocus();
  }, [onFocus, inputRef]);

  const _onBlur = useCallback(() => {
    inputRef.current?.blur();
    typeof onBlur === 'function' && onBlur();
  }, [onFocus, inputRef]);

  const onClear = useCallback(() => {
    props.onChangeText('');
  }, [props]);

  return (
    <ComponentContainer>
      <Container
        classname={props.classname}
        onFocus={_onFocus}
        onBlur={_onBlur}
        error={error}
        style={props.containerStyle}>
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
        {clearable && <ClearIcon name="close-circle" onPress={onClear} />}
      </Container>
      <AnimatedError error={error} />
    </ComponentContainer>
  );
};
export default InputField;

const ComponentContainer = styled(View)`
  width: 100%;
`;

const Container = styled(View)`
  align-items: center;
  padding-left: ${scaleDpTheme(10)};
  padding-right: ${scaleDpTheme(10)};
  flex-direction: row;
  background-color: white;
  border-color: ${(props) => (props.error ? theme.error : 'transparent')};
  border-width: 1px;
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

const ClearIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.primaryLightColor};
  flex: 1;
  text-align: right;
`;
