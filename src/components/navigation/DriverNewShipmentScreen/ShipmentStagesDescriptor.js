import React, {useMemo} from 'react';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';
import {useSelector} from 'react-redux';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {Row} from 'components/ui/Row';
import dayjs from 'dayjs';

export const ShipmentStagesDescriptor = (point) => () => {
  const arrivalTime = useMemo(() => {
    const time = dayjs(point.duration);
    return `${time.format('HH:mm')} - ${time
      .add(10, 'minute')
      .format('HH:mm')}`;
  }, [point.duration]);

  return (
    <>
      <Title>Buscando paquete</Title>
      <StaticInputField label="Se encuentra en">
        {point?.name.split(',')?.[0]}
      </StaticInputField>
      <Row>
        <StaticInputField style={{width: '45%'}} label="Distancia">
          {Math.round(point.distance / 1000)} Km
        </StaticInputField>
        <StaticInputField style={{width: '45%'}} label="Llegas a las">
          {arrivalTime} Hs.
        </StaticInputField>
      </Row>
    </>
  );
};
