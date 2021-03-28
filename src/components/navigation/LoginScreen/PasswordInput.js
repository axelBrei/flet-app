import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';

export const PasswordInput = ({hideIcon, ...props}) => {
  const [secureText, setSecureText] = useState(true);

  const onPressIcon = useCallback(() => setSecureText(!secureText), [
    setSecureText,
    secureText,
  ]);

  const renderAccesory = useCallback(
    () => (
      <Icon
        onPress={onPressIcon}
        name={secureText ? 'eye' : 'eye-off'}
        color={theme.fontColor}
        size={25}
      />
    ),
    [secureText],
  );

  return (
    <InputField
      renderAccesory={renderAccesory}
      icon={!hideIcon && 'lock'}
      secureTextEntry={secureText}
      disableCapitalize
      keyboardType="default"
      multiline={false}
      autoCapitalize={'none'}
      textContentType="password"
      {...props}
    />
  );
};
