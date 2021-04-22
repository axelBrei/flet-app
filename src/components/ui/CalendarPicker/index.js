import React, {useState, useCallback, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {View, Pressable, Platform} from 'react-native';
import {Modal} from 'components/ui/Modal/index';
import {formatDate} from 'helpers/dateHelper';
import {useModal} from 'components/Hooks/useModal';
import {Calendar} from 'components/ui/Calendar';
import InputField from 'components/ui/InputField';
import {Title} from 'components/ui/Title';

export default ({
  label,
  value = null,
  onSelectDay = () => {},
  calendarOptions,
  error,
  hideIcon,
  ...props
}) => {
  const [currentDate, setCurrentDate] = useState(value);
  useEffect(() => {
    setCurrentDate(value);
  }, [value]);

  const onDayPress = useCallback(
    toggleModal => date => {
      setCurrentDate(date);
      toggleModal();
      onSelectDay(date);
    },
    [onSelectDay, setCurrentDate],
  );

  const renderCalendar = useCallback(
    ({toggleModal}) => (
      <ModalContainer>
        <Title>Seleccioná la fecha</Title>
        <Calendar onDayPress={onDayPress(toggleModal)} {...calendarOptions} />
      </ModalContainer>
    ),
    [onDayPress, calendarOptions],
  );

  const {Modal, toggle, isModalVisible} = useModal(
    renderCalendar,
    {},
    {cancelable: true},
  );

  const onFocusInput = useCallback(() => {}, [toggle]);

  const onCleanInput = useCallback(
    t => {
      if (t === '') {
        setCurrentDate(null);
      }
    },
    [setCurrentDate],
  );

  return (
    <>
      <InputContainer onPress={toggle} activeOpacity={0.5}>
        <InputField
          onFocus={onFocusInput}
          focusable={false}
          editable={false}
          pointerEvents="none"
          label={label || 'Selecciona una fecha'}
          icon={!hideIcon && 'calendar'}
          value={formatDate(currentDate)}
          onChangeText={onCleanInput}
          error={error}
          {...props}
        />
      </InputContainer>
      <Modal />
    </>
  );
};

const InputContainer = styled(Pressable)`
  flex-direction: row;
  width: 100%;
  min-width: ${props => props.theme.scale(150)}px;
  padding-bottom: ${props => props.theme.scale(2)}px;
  padding-top: ${props => props.theme.scale(3)}px;
`;

const ModalContainer = styled(View)`
  background-color: ${props => props.theme.colors.white};
  border-radius: 20px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
