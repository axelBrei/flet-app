import React from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {useModal, useModalContext} from 'components/Hooks/useModal';
import ModalContent from 'components/ui/TimePicker/ModalContent';

export default ({label, value, onChangeValue}) => {
  const {Modal, toggle} = useModal(
    ModalContent,
    {onPressAccept: ({hour, minute}) => onChangeValue(`${hour}:${minute}`)},
    {fullscreen: true, cancelable: true, swipeToClose: false},
  );
  const onFocus = () => {
    toggle();
    return true;
  };

  return (
    <>
      <InputField label={label} icon="clock" onFocus={onFocus} value={value} />
      <Modal />
    </>
  );
};
