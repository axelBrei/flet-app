import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import {Modal} from 'components/ui/Modal/index';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import dayjs from 'dayjs';
import {formatDate} from 'helpers/dateHelper';
import {scaleDp} from 'helpers/responsiveHelper';
import {useModal} from 'components/Hooks/useModal';
import {Calendar} from 'components/ui/Calendar';
import {theme} from 'constants/theme';
import {AnimatedLabel} from 'components/ui/AnimatedLabel';

export default ({
  label,
  initialDate = null,
  onSelectDay = () => {},
  calendarOptions,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

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
  return (
    <>
      <Container>
        <AnimatedLabel
          label="Selecciona una fecha"
          focused={currentDate || isModalVisible}
          xTranslation={18}
          yTranslation={17}
          initialY={2}
        />
        <InputContainer onPress={toggle}>
          <Icon size={scaleDp(16)} name="calendar" color={theme.primaryColor} />
          {/*<Text*/}
          {/*  fontSize={10}*/}
          {/*  color={currentDate ? theme.fontColor : theme.disabled}>*/}
          {/*  {currentDate*/}
          {/*    ? formatDate(currentDate, 'DD/MM/YYYY')*/}
          {/*    : 'Elegí una fecha'}*/}
          {/*</Text>*/}
          {currentDate && (
            <ClearIcon
              name="close-circle"
              onPress={() => setCurrentDate(null)}
            />
          )}
        </InputContainer>
      </Container>
      <Modal />
    </>
  );
};
const Container = styled(View)`
  align-items: flex-start;
`;

const InputContainer = styled(TouchableOpacity)`
  flex-direction: row;
  min-width: ${(props) => props.theme.scale(150)}px;
  align-items: center;
  border-bottom-width: 1px;
  padding-bottom: ${(props) => props.theme.scale(2)}px;
  padding-top: ${(props) => props.theme.scale(3)}px;
`;

const Text = styled(AppText)`
  margin-left: ${(props) => props.theme.scale(5)}px;
`;

const ModalContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.white};
`;

const ClearIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.primaryLightColor};
  flex: 1;
  text-align: right;
`;
