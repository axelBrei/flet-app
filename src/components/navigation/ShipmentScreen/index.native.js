import React, {useMemo} from 'react';
import {Screen} from 'components/ui/Screen';
import {ShipmentDetailCard} from 'components/navigation/ShipmentScreen/ShipmentDetailCard';
import Map from 'components/ui/Map';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {getMarkersList} from 'components/navigation/ShipmentScreen/constants';
import DraggableBottomView from 'components/ui/DraggableBottomView';
import styled from 'styled-components';
import {Platform} from 'react-native';
import {Container} from 'components/ui/Container';
import {scaleDp} from 'helpers/responsiveHelper';

export default ({route}) => {
  const {height, width} = useWindowDimension();
  const shipmentData = route?.params;
  const markers = useMemo(() => getMarkersList(shipmentData), [shipmentData]);

  return (
    <Screen
      style={{height, width}}
      scrollable={false}
      enableAvoidKeyboard={false}>
      <Map style={{height, width}} markers={markers} minMarkerAnimation={0} />
      <DraggableBottomView initialHiddenContentPercentage={0.35}>
        <CardContainer>
          <ShipmentDetailCard />
        </CardContainer>
      </DraggableBottomView>
    </Screen>
  );
};

const CardContainer = styled(Container)`
  height: ${(props) =>
    Platform.select({
      web: props.theme.screenHeight * 0.7,
      native: scaleDp(450),
    })}px;
`;
