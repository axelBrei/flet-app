import React, {useMemo} from 'react';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from 'components/navigation/ShipmentScreen/index.native';
import {Screen} from 'components/ui/Screen';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {ShipmentDetailCard} from 'components/navigation/ShipmentScreen/ShipmentDetailCard';
import Map from 'components/ui/Map';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {getMarkersList} from 'components/navigation/ShipmentScreen/constants';

const ShipmentScreen = ({route}) => {
  const shipmentData = route?.params;
  const {width, height} = useWindowDimension();
  const markers = useMemo(() => getMarkersList(shipmentData), [shipmentData]);
  // TODO: update driver position
  return (
    <ScreenComponent>
      <Map
        markers={markers}
        minMarkerAnimation={0}
        style={{height: height - scaleDp(40), width}}
        edgePadding={{
          top: height * 0.25,
          left: height * 0.35,
          right: 0,
          bottom: 0,
        }}
      />
      <ShipmentDetailContainer>
        <ShipmentDetailCard />
      </ShipmentDetailContainer>
    </ScreenComponent>
  );
};

export default WithMobileSupport(ShipmentScreen, MobileScreen);

const ScreenComponent = styled(Screen)`
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  height: ${(props) => props.theme.screenHeight}px;
  width: 100%;
  padding: ${scaleDpTheme(20)} 0;
`;

const ShipmentDetailContainer = styled(Container)`
  background-color: ${theme.white};
  position: absolute;
  top: ${scaleDpTheme(25)};
  left: ${scaleDpTheme(15)};
  padding: ${scaleDpTheme(10)} ${scaleDpTheme(15)};
  border-radius: ${scaleDpTheme(8)};
  box-shadow: 0 3px 6px ${theme.shadowColor};
  width: max(${scaleDpTheme(270)}, 35%);
`;
