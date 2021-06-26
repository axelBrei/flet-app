import {Platform} from 'react-native';
import END_POINT_MARKER_SVG from 'resources/icons/endpoint-flag.svg';
import END_POINT_MARKER_PNG from 'resources/icons/endpoint-flag.png';
import CarMarker from 'resources/assets/driver_car.svg';
import CAR_MARKER from 'resources/assets/driver_car.png';
import {theme} from 'constants/theme';

export const getMarkersList = (shipmentData = null, driverPosition = {}) => {
  try {
    if (!shipmentData || shipmentData?.destinations?.length === 0) {
      return [];
    }
    let data = {...shipmentData};
    if (data?.addresses && !data?.destinations) {
      data.destinations = data?.addresses;
    }
    const destinationIndex = data?.destinations?.findIndex(
      i => i?.id === data?.currentDestination,
    );
    if (!destinationIndex || destinationIndex < 0) {
      return [];
    }
    const endPoint = data?.destinations[destinationIndex]?.address;
    const startPoint = data?.destinations[destinationIndex - 1]?.address;

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
  } catch (e) {
    return [];
  }
};
