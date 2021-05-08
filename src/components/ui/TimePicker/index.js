import React, {useState} from 'react';
import {theme} from 'constants/theme';
import InputField from 'components/ui/InputField';
import {useModal, useModalContext} from 'components/Hooks/useModal';
import ModalContent from 'components/ui/TimePicker/ModalContent';
import dayjs from 'dayjs';
import {AppText} from 'components/ui/AppText';

export default ({label, value, onChangeValue, ...props}) => {
  const [isTomorrowDate, setIsTomorrowDate] = useState(false);
  const {Modal, toggle} = useModal(
    ModalContent,
    {
      contentStyle: {
        borderRadius: 20,
      },
    },
    {
      fullscreen: true,
      cancelable: true,
      swipeToClose: false,
      avoidKeyboard: true,
    },
  );
  const onFocus = () => {
    toggle();
    return true;
  };

  const onPressAccept = values => {
    const now = dayjs();
    let datetime = dayjs().hour(values.hour).minute(values.minute);
    setIsTomorrowDate(datetime.isBefore(now));
    if (datetime.isBefore(now)) {
      datetime = datetime.add(1, 'day');
    }
    onChangeValue({
      ...values,
      datetime,
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
      <AppText color={theme.error}>
        {isTomorrowDate ? 'Tené en cuenta que el horario termina mañana' : ''}
      </AppText>
      <Modal onPressAccept={onPressAccept} initialValue={value} />
    </>
  );
};
