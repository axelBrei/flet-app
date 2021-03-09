import {Platform} from 'react-native';
import BUS_MARKER_SVG from 'resources/assets/bus_marker.svg';
import END_POINT_MARKER_SVG from 'resources/assets/endpoint_marker.svg';
import END_POINT_MARKER_PNG from 'resources/assets/endpoint_marker.png';
import BUS_MARKER_PNG from 'resources/assets/bus_marker.png';

export const getMarkersList = (shipmentData = {}, driverPosition = {}) => [
  shipmentData?.startPoint,
  {
    ...driverPosition,
    icon: Platform.select({
      native: BUS_MARKER_SVG,
      web: BUS_MARKER_PNG,
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
