import {Platform} from 'react-native';
import END_POINT_MARKER_SVG from 'resources/icons/endpoint-flag.svg';
import END_POINT_MARKER_PNG from 'resources/icons/endpoint-flag.png';
import CarMarker from 'resources/assets/driver_car.svg';
import CAR_MARKER from 'resources/assets/driver_car.png';
import {theme} from 'constants/theme';

export const getMarkersList = (shipmentData = null, driverPosition = {}) => {
  if (!shipmentData || shipmentData?.destinations?.length === 0) {
    return [];
  }
  if (shipmentData?.addresses && !shipmentData?.destinations) {
    shipmentData.destinations = shipmentData?.addresses;
  }
  const destinationIndex = shipmentData?.destinations?.findIndex(
    i => i.id === shipmentData?.currentDestination,
  );
  const endPoint = shipmentData?.destinations[destinationIndex]?.address;
  const startPoint = shipmentData?.destinations[destinationIndex - 1]?.address;

  return [
    {
      ...startPoint,
      color: theme.primaryDarkColor,
    },
    driverPosition.latitude !== 0 && {
      ...driverPosition,
      icon: Platform.select({
        native: CarMarker,
        web: CAR_MARKER,
      }),
      iconSize: {
        width: 53,
        height: 33,
      },
    },
    {
      ...endPoint,
      color: theme.primaryDarkColor,
      icon: Platform.select({
        native: END_POINT_MARKER_SVG,
        web: END_POINT_MARKER_PNG,
      }),
      iconSize: {
        width: 43,
        height: 43,
      },
    },
  ];
};
