import React, {useCallback, useRef} from 'react';
import {Platform, TextInput, View, ActivityIndicator} from 'react-native';
import styled, {css} from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AnimatedError} from 'components/ui/AnimatedError';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import PropTypes from 'prop-types';
import {AnimatedLabel} from 'components/ui/InputField/AnimatedLabel';
import {AppText} from 'components/ui/AppText';

const InputField = ({
  externalRef,
  label,
  error,
  onFocus,
  onBlur,
  icon,
  loading,
  clearable,
  renderAccesory,
  onLayout,
  disableErrors,
  unitString,
  style,
  ...props
}) => {
  const inputRef = useRef(externalRef);

  React.useImperativeHandle(externalRef, () => ({
    focus: inputRef.current?.focus?.(),
  }));

  const _onFocus = useCallback(
    e => {
      if (typeof onFocus === 'function' && onFocus()) {
        e.preventDefault?.();
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    },
    [onFocus, inputRef],
  );

  const _onBlur = useCallback(() => {
    inputRef.current?.blur();
    typeof onBlur === 'function' && onBlur();
  }, [onFocus, inputRef]);

  const onClear = useCallback(() => {
    props.onChangeText('');
  }, [props]);

  return (
    <ComponentContainer style={style} onLayout={onLayout}>
      <Container
        // onFocus={_onFocus}
        onBlur={_onBlur}
        error={error}
        style={props.containerStyle}>
        {!!icon && <Icon name={icon} size={25} color={theme.fontColor} />}
        <Input
          autoCompleteType={props.autoCompleteType}
          ref={inputRef}
          onBlur={_onBlur}
          onFocus={_onFocus}
          autoCorrect={false}
          autoCapitalize={props.disableCapitalize ? 'none' : 'words'}
          blurOnSubmit
          placeholderTextColor={theme.disabledFont}
          {...props}
          placeholder={label}
        />
        {unitString && !!props.value && (
          <UnitText onPress={_onFocus}>{unitString}</UnitText>
        )}
        {!icon && !!props.value && (
          <AnimatedLabel label={label} valuePresent={props.value} />
        )}
        <Loader size="small" animating={loading} color={theme.primaryColor} />
        {clearable && props.value !== '' && (
          <ClearIcon
            name="close-circle"
            onPress={onClear}
            size={20}
            isAlone={!renderAccesory()}
          />
        )}
        {!!renderAccesory && renderAccesory(onClear)}
      </Container>
      {!disableErrors && error && <AnimatedError error={error} />}
    </ComponentContainer>
  );
};

InputField.defaultProps = {
  autoCompleteType: 'off',
  loading: false,
  icon: null,
  disableErrors: false,
  renderAccesory: () => null,
  unitString: null,
  value: '',
  disableCapitalize: false,
  keyboardType: 'default',
};
InputField.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'email-address',
    'numeric',
    'decimal-pad',
    'phone-pad',
  ]),
  disableCapitalize: PropTypes.bool,
};
export default React.forwardRef((props, ref) => (
  <InputField externalRef={ref} {...props} />
));

const ComponentContainer = styled(View)`
  display: flex;
  width: 100%;
  z-index: 0;
  margin-bottom: 15px;
`;

const Container = styled(View)`
  align-items: center;
  padding: 0 20px;
  flex-direction: row;
  background-color: ${theme.grayBackground};
  border-radius: 40px;
  border-width: 1px;
  border-color: ${({error}) => (error ? theme.error : 'transparent')};
`;

const Input = styled(TextInput)`
  font-family: ${({theme}) => theme.fonts.regular};
  z-index: 2;
  flex: 1;
  color: ${props => props.theme.colors.fontColor};
  padding: 15px 0 15px 5px;
  font-size: 14px;
  overflow: hidden;
  ${props =>
    props.theme.screenWidth < 800 &&
    Platform.OS === 'web' &&
    css`
      min-font-size: 17px;
    `}
`;

const ClearIcon = styled(Icon)`
  color: ${props => props.theme.colors.fontColor};
  flex-shrink: 1;
  text-align: right;
  margin-right: ${props => (props.isAlone ? 0 : '10px')};
`;

const Loader = styled(ActivityIndicator)`
  width: ${scaleDpTheme(15)};
`;

const UnitText = styled(AppText)`
  font-size: 14px;
  ${props =>
    props.theme.screenWidth < 800 &&
    Platform.OS === 'web' &&
    css`
      min-font-size: 17px;
    `}
`;
