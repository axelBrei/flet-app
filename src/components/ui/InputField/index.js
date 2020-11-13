import React, {useState, useCallback, useRef} from 'react';
import {Platform, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {AnimatedBorder} from 'components/ui/InputField/AnimatedBorder';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AnimatedLabel} from 'components/ui/InputField/AnimatedLabel';

const InputFiled = ({label, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const onFocus = useCallback(() => {
    setIsFocused(true);
    inputRef.current?.focus();
  }, [setIsFocused, inputRef]);

  const onBlur = useCallback(() => {
    setIsFocused(false);
    inputRef.current?.blur();
  }, [setIsFocused, inputRef]);

  return (
    <Container onFocus={onFocus} onBlur={onBlur}>
      <AnimatedLabel
        focused={isFocused || props.value}
        label={label}
        onPress={isFocused ? onBlur : onFocus}
      />
      <Input ref={inputRef} onBlur={onBlur} onFocus={onFocus} {...props} />
      <AnimatedBorder focused={isFocused} />
    </Container>
  );
};
export default (props) => {
  if (!props.onTextChange) {
    const [val, setVal] = useState('');
    return <InputFiled {...props} value={val} onChangeText={setVal} />;
  }
  return <InputFiled {...props} />;
};

const Container = styled(View)`
  margin-top: ${scaleDpTheme(10)};
  margin-bottom: ${scaleDpTheme(10)};
`;

const Input = styled(TextInput)`
  color: ${(props) => props.theme.colors.fontColor};
  min-width: ${scaleDpTheme(150)};
  padding: 0;
  padding-left: ${scaleDpTheme(5)};
  color: black;
  height: ${Platform.select({
    native: scaleDp(25),
    web: scaleDp(20),
  })};
`;
