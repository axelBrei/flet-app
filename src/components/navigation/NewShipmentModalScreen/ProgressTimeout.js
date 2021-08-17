import {Row} from 'components/ui/Row';
import {CircularProgress} from 'components/ui/CircularProgress';
import {AppText} from 'components/ui/AppText';
import {Title} from 'components/ui/Title';
import React, {useCallback, useEffect, useState} from 'react';
import useStopableInterval from 'components/Hooks/useStopableInterval';
import styled from 'styled-components';
import {MainButton} from 'components/ui/MainButton';
import {theme} from 'constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  rejectShipment,
  removeShipmentFromList,
  selectDriverShipmentData,
  selectLoadingPendingShipmentAnswer,
} from 'redux-store/slices/driverShipmentSlice';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import dayjs from 'dayjs';
import Animated from 'react-native-reanimated';

const ACCEPTANCE_TIME = 30; //seconds
export const ProgressTimeout = ({onPressAccept}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const shipments = useSelector(selectDriverShipmentData);
  const loading = useSelector(selectLoadingPendingShipmentAnswer);
  const {id, updatedAt} = shipments?.[0] || {};
  const timeDif = Math.round(
    Math.abs((dayjs().valueOf() - dayjs(updatedAt).valueOf()) / 1000),
  );
  const [timeLeft, setTimeLeft] = useState(
    timeDif <= 0 ? 15 : ACCEPTANCE_TIME - timeDif,
  );

  const clean = useStopableInterval(() => {
    const remaining = timeLeft - 1;
    setTimeLeft(remaining);
    if (isFocused && remaining === 0) {
      dispatch(removeShipmentFromList(id || 0)); // remove shipment of list
      dispatch(rejectShipment(id));
      navigation.goBack();
      return true;
    }
    return remaining <= 0;
  }, 1000);

  return (
    <>
      <Row disablePadding>
        <CircularProgress
          text={timeLeft <= 0 ? '0' : `${timeLeft}`}
          progressPercent={Math.max(0, (timeLeft / ACCEPTANCE_TIME) * 100)}
        />
        <AppText textAlign="left" width="100%">
          <Title>Tiempo restante</Title>
          {'\n'}
          <AppText>{'Acepta el pedido antes de que\nacabe el tiempo'}</AppText>
        </AppText>
      </Row>
      <AcceptButton
        loaderColor={theme.white}
        loading={loading}
        onPress={onPressAccept}
        disabled={timeLeft <= 0}>
        Aceptar
      </AcceptButton>
    </>
  );
};

ProgressTimeout.defaultProps = {
  onPressAccept: () => {},
};

const AcceptButton = styled(MainButton)`
  background-color: ${({disabled}) => (disabled ? theme.gray : theme.online)};
  margin-bottom: 20px;
  border-radius: 30px;
`;
