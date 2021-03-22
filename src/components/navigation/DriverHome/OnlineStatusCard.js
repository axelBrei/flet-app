import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {useUserData} from 'components/Hooks/useUserData';
import {Title} from 'components/ui/Title';
import {LayoutAnimation} from 'react-native';
import {MainButton} from 'components/ui/MainButton';
import {theme} from 'constants/theme';
import {useSelector} from 'react-redux';
import {selectOnlineStatus} from 'redux-store/slices/driverSlice';
import TimePicker from 'components/ui/TimePicker';

export const OnlineStatusCard = ({onPressButton}) => {
  const {name} = useUserData();
  const isOnline = useSelector(selectOnlineStatus);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isOnline]);

  console.log(isOnline);
  return (
    <Container>
      <Row>
        <Title>¡Hola {name}!</Title>
        <OnlineStatusContainer>
          <AppText color={isOnline ? theme.online : theme.cancel}>
            {isOnline ? 'En linea' : 'Desconectado'}
          </AppText>
        </OnlineStatusContainer>
      </Row>
      {!isOnline && (
        <TimePicker
          label="¿Hasta que hora estas hoy?"
          icon="clock"
          value={selectedTime}
          onChangeValue={setSelectedTime}
        />
      )}
      <Button
        bold={false}
        isOnline={isOnline}
        label={isOnline ? 'Dejar de buscar viajes' : 'Empezar a buscar viajes'}
        onPress={() => onPressButton(!isOnline)}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  padding: 20px;
  align-items: center;
`;
// ${Platform.OS !== 'web' ? 80 : 20}px;
const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const Button = styled(MainButton)`
  background-color: ${(props) =>
    props.isOnline ? theme.cancel : theme.online};
  max-width: 374px;
  width: 100%;
`;

const OnlineStatusContainer = styled.View`
  background-color: ${theme.grayBackground};
  padding: 5px 10px;
  border-radius: 20px;
`;
