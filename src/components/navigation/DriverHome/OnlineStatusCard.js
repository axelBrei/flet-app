import React, {useState, useEffect, useCallback} from 'react';
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
import dayjs from 'dayjs';

export const OnlineStatusCard = ({onPressButton}) => {
  const {name} = useUserData();
  const isOnline = useSelector(selectOnlineStatus);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    error && setError(null);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isOnline]);

  const onChangeData = useCallback(
    ({datetime, ...rest}) => {
      if (datetime.isBefore(dayjs())) {
        setError('Debe ser un horario futuro');
      } else {
        setError(null);
      }
      setSelectedTime({...rest, date: datetime});
    },
    [onPressButton, setError],
  );

  const _onPressButton = () => {
    if (!error) {
      onPressButton(!isOnline);
    } else {
    }
  };

  return (
    <Container>
      <Row>
        <Title>¡Hola {name}!</Title>
        <OnlineStatusContainer isOnline={isOnline}>
          <AppText color={theme.white} bold>
            {isOnline ? 'En linea' : 'Desconectado'}
          </AppText>
        </OnlineStatusContainer>
      </Row>
      <Button
        bold={false}
        isOnline={isOnline}
        label={isOnline ? 'Dejar de buscar viajes' : 'Empezar a buscar viajes'}
        onPress={_onPressButton}
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
  background-color: white;
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
  background-color: ${props => (props.isOnline ? theme.cancel : theme.online)};
  max-width: 374px;
  width: 100%;
`;

const OnlineStatusContainer = styled.View`
  background-color: ${props => (props.isOnline ? theme.online : theme.error)};
  padding: 5px 10px;
  border-radius: 20px;
`;
