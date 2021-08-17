import React, {useMemo} from 'react';
import Screen from 'components/ui/Screen';
import {ShipmentDetailCard} from 'components/navigation/ShipmentScreen/ShipmentDetailCard';
import Map from 'components/ui/Map';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {getMarkersList} from 'components/navigation/ShipmentScreen/constants';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {
  selectCurrentShipment,
  selectCurrentShipmentStatus,
  selectDriverPosition,
} from 'redux-store/slices/shipmentSlice';
import {theme} from 'constants/theme';
import {useShipmentIntervals} from 'components/navigation/ShipmentScreen/useShipmentIntervals';
import BottomSheet from 'components/ui/DraggableBottomView';

export default ({}) => {
  const {width, height} = useWindowDimension();
  const driverPosition = useSelector(selectDriverPosition);
  const shipmentStatus = useSelector(selectCurrentShipmentStatus);
  const currentShipment = useSelector(selectCurrentShipment);

  useShipmentIntervals();

  const markers = useMemo(
    () =>
      getMarkersList(
        shipmentStatus?.startPoint ? shipmentStatus : currentShipment,
        driverPosition,
      ),
    [shipmentStatus, driverPosition],
  );

  return (
    <Screen
      style={{width}}
      scrollable={false}
      enableAvoidKeyboard={false}
      removeTWF>
      <Map
        style={{flex: 1}}
        markers={markers}
        minMarkerAnimation={0}
        edgePadding={
          markers?.length === 1
            ? {top: 100, bottom: 250, left: 60, right: 60}
            : {
                top: 40,
                bottom: 150,
                left: 20,
                right: 20,
              }
        }
      />
      <BottomSheet initialHiddenContentPercentage={0.5}>
        <ShipmentDetailCard />
      </BottomSheet>
    </Screen>
  );
};
