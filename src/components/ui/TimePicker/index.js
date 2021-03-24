import React from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {useModal, useModalContext} from 'components/Hooks/useModal';
import ModalContent from 'components/ui/TimePicker/ModalContent';
import dayjs from 'dayjs';

export default ({label, value, onChangeValue, ...props}) => {
  const {Modal, toggle} = useModal(
    ModalContent,
    {},
    {fullscreen: true, cancelable: true, swipeToClose: false},
  );
  const onFocus = () => {
    toggle();
    return true;
  };

  const onPressAccept = (time) => {
    onChangeValue({
      ...time,
      datetime: dayjs().hour(time.hour).minute(time.minute),
    });
  };

  return (
    <>
      <InputField
        label={label}
        icon="clock"
        onFocus={onFocus}
        value={value && `${value.hour}:${value.minute}`}
        {...props}
      />
      <Modal onPressAccept={onPressAccept} />
    </>
  );
};
