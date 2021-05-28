import React, {useMemo} from 'react';
import {Screen} from 'components/ui/Screen';
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
    <Screen style={{width}} scrollable={false} enableAvoidKeyboard={false}>
      <Map
        style={{flex: 1}}
        markers={markers}
        minMarkerAnimation={0}
        edgePadding={{
          top: 40,
          bottom: 40,
        }}
      />
      {/*<CardContainer>*/}
      <BottomSheet
        initialHiddenContentPercentage={0.5}
        snapPoints={height > 700 ? ['35%', '60%'] : ['40%', '85%']}>
        <ShipmentDetailCard />
      </BottomSheet>
      {/*</CardContainer>*/}
    </Screen>
  );
};

const CardContainer = styled.View`
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${theme.white};
  box-shadow: 3px -3px 8px ${theme.shadowColor};
`;
