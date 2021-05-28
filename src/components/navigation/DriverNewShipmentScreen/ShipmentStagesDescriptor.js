import React, {useCallback, useMemo} from 'react';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';
import {useSelector} from 'react-redux';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {Row} from 'components/ui/Row';
import dayjs from 'dayjs';
import {SHIPMENT_STATE} from 'constants/shipmentStates';

const {WAITING_ORIGIN, ON_PROCESS} = SHIPMENT_STATE;
export const ShipmentStagesDescriptor = (
  {duration, distance, address, ...rest},
  status,
  updatedAt = dayjs(),
) => () => {
  const arrivalTime = useMemo(() => {
    const time = dayjs(updatedAt).add(duration, 's');
    return `${time.format('HH:mm')} - ${time
      .add(10, 'minute')
      .format('HH:mm')}`;
  }, [updatedAt, duration]);

  const getTitle = useCallback(() => {
    if (status === WAITING_ORIGIN) return 'Esperando paquete';
    else if (status === ON_PROCESS) return 'LLevando paquete';
    return 'Buscando paquete';
  }, [status]);

  const getSubtitle = useCallback(() => {
    if (status === WAITING_ORIGIN) return 'Próximo destino';
    else if (status === ON_PROCESS) return 'Llevar paquete a';
    return 'Se encuentra en';
  }, []);

  return (
    <>
      <Title>{getTitle()}</Title>
      <StaticInputField label={getSubtitle()}>
        {address?.name.split(',')?.[0]}
      </StaticInputField>
      <Row>
        <StaticInputField style={{width: '48%'}} label="Distancia">
          {Math.round(distance / 1000)} Km
        </StaticInputField>
        <StaticInputField style={{width: '48%'}} label="Llegas a las">
          {arrivalTime} Hs.
        </StaticInputField>
      </Row>
    </>
  );
};
