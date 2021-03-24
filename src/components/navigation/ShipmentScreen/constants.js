import {Platform} from 'react-native';
import END_POINT_MARKER_SVG from 'resources/assets/endpoint_marker.svg';
import END_POINT_MARKER_PNG from 'resources/assets/endpoint_marker.png';
import CarMarker from 'resources/assets/driver_car.svg';
import CAR_MARKER from 'resources/assets/driver_car.png';

export const getMarkersList = (shipmentData = {}, driverPosition = {}) => [
  shipmentData?.startPoint,
  driverPosition.latitude !== 0 && {
    ...driverPosition,
    icon: Platform.select({
      native: CarMarker,
      web: CAR_MARKER,
    }),
  },
  {
    ...shipmentData?.endPoint,
    icon: Platform.select({
      native: END_POINT_MARKER_SVG,
      web: END_POINT_MARKER_PNG,
    }),
  },
];
