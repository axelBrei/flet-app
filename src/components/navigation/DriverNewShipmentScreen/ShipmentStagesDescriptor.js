import React from 'react';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';
import {useSelector} from 'react-redux';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {Row} from 'components/ui/Row';

export const ShipmentStagesDescriptor = (point) => () => {
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
          {point.duration} - 13:45 Hs.
        </StaticInputField>
      </Row>
    </>
  );
};
