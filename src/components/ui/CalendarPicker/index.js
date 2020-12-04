import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {View, Pressable} from 'react-native';
import {Modal} from 'components/ui/Modal/index';
import {AppText} from 'components/ui/AppText';
import {formatDate} from 'helpers/dateHelper';
import {useModal} from 'components/Hooks/useModal';
import {Calendar} from 'components/ui/Calendar';
import InputField from 'components/ui/InputField';

export default ({
  label,
  value = null,
  onSelectDay = () => {},
  calendarOptions,
  error,
}) => {
  const [currentDate, setCurrentDate] = useState(value);
  useEffect(() => {
    setCurrentDate(value);
  }, [value]);

  const onDayPress = useCallback(
    (toggleModal) => (date) => {
      setCurrentDate(date);
      toggleModal();
      onSelectDay(date);
    },
    [onSelectDay, setCurrentDate],
  );

  const renderCalendar = useCallback(
    ({toggleModal}) => (
      <ModalContainer>
        <AppText>Seleccioná la fecha</AppText>
        <Calendar onDayPress={onDayPress(toggleModal)} {...calendarOptions} />
      </ModalContainer>
    ),
    [onDayPress, calendarOptions],
  );

  const {Modal, toggle, isModalVisible} = useModal(renderCalendar);

  const onFocusInput = useCallback(() => {}, [toggle]);

  return (
    <>
      <InputContainer onPress={toggle} activeOpacity={0.5}>
        <InputField
          onFocus={onFocusInput}
          focusable={false}
          editable={false}
          pointerEvents="none"
          label={label || 'Selecciona una fecha'}
          icon="calendar"
          value={formatDate(currentDate)}
          error={error}
        />
      </InputContainer>
      <Modal />
    </>
  );
};

const InputContainer = styled(Pressable)`
  flex-direction: row;
  width: 100%;
  min-width: ${(props) => props.theme.scale(150)}px;
  padding-bottom: ${(props) => props.theme.scale(2)}px;
  padding-top: ${(props) => props.theme.scale(3)}px;
`;

const ModalContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.white};
`;
