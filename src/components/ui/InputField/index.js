import React, {useCallback, useRef} from 'react';
import {Platform, TextInput, View, ActivityIndicator} from 'react-native';
import styled, {css} from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AnimatedError} from 'components/ui/AnimatedError';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import PropTypes from 'prop-types';

const InputField = ({
  label,
  error,
  onFocus,
  onBlur,
  icon,
  loading,
  clearable,
  onLayout,
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
    <ComponentContainer style={props.style} onLayout={onLayout}>
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
          autoCompleteType={props.autoCompleteType}
          ref={inputRef}
          onBlur={_onBlur}
          onFocus={_onFocus}
          {...props}
          placeholder={label}
        />
        <Loader size={20} animating={loading} color={theme.primaryColor} />
        {clearable && <ClearIcon name="close-circle" onPress={onClear} />}
      </Container>
      <AnimatedError error={error} />
    </ComponentContainer>
  );
};

InputField.defaultProps = {
  autoCompleteType: 'off',
  loading: false,
};
InputField.propTypes = {
  onChangeText: PropTypes.func.isRequired,
};
export default InputField;

const ComponentContainer = styled(View)`
  display: flex;
  width: 100%;
  z-index: 0;
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
  box-shadow: 0px 3px 6px ${theme.shadowColor};
  elevation: 3;
  overflow: hidden;
`;

const Input = styled(TextInput)`
  flex: 1;
  color: ${(props) => props.theme.colors.fontColor};
  min-width: ${scaleDpTheme(150)};
  font-size: ${scaleDpTheme(12)};
  padding-top: ${scaleDpTheme(15)};
  padding-bottom: ${scaleDpTheme(15)};
  padding-left: ${scaleDpTheme(10)};
  overflow: hidden;
  ${(props) =>
    props.theme.screenWidth < 800 &&
    Platform.OS === 'web' &&
    css`
      min-font-size: 17px;
      font-size: max(${(props) => scaleDp(props.fontSize) + 'px'}, 20px);
    `}
`;

const ClearIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.primaryLightColor};
  flex: 1;
  text-align: right;
`;

const Loader = styled(ActivityIndicator)`
  width: ${scaleDpTheme(15)};
`;
