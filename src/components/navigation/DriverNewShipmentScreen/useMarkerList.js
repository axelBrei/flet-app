import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View, Platform} from 'react-native';
import EndpointMarker from 'resources/assets/endpoint_marker.svg';
import ENDPOINT_MARKER_PNG from 'resources/assets/endpoint_marker.png';
import CarMarker from 'resources/assets/driver_car.svg';
import CAR_MARKER from 'resources/assets/driver_car.png';
import {useSelector} from 'react-redux';
import {getCurrentPosition, trackUserPosition} from 'helpers/locationHelper';
import {getBearingFromCoords} from 'helpers/locationHelper';
import {scaleDp} from 'helpers/responsiveHelper';
import {getRotatedMarker} from 'components/ui/Map/helper';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import useBackgroundLocation from 'components/Hooks/useBackgroundLocation';
import {
  selectCurrentPosition,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

export const useMarkerList = () => {
  const [lastUserPosition, setLastUserPosition] = useState(null);
  const currentLocation = useSelector(selectCurrentPosition);
  const [directionsMakers, setDirectionsMakers] = useState(null);
  const [currentPositionMarker, setCurrenPositionMarker] = useState(null);
  const shipment = useSelector(selectDriverShipmentData);

  const orientation = useMemo(() => {
    if (currentLocation) {
      return getBearingFromCoords(
        lastUserPosition || shipment.startPoint,
        currentLocation,
      );
    }
    return 0;
  }, [lastUserPosition, currentLocation, shipment]);

  useEffect(() => {
    if (shipment.id) {
      const point =
        shipment?.status === SHIPMENT_STATE.ON_PROCESS
          ? shipment.endPoint
          : shipment.startPoint;
      setDirectionsMakers({
        latitude: point.latitude,
        longitude: point.longitude,
        anchor: {
          x: 0.75,
          y: 0.9,
        },
        icon: Platform.select({
          native: EndpointMarker,
          web: ENDPOINT_MARKER_PNG,
        }),
      });
    }
  }, [shipment, setDirectionsMakers]);

  useEffect(() => {
    const getLocation = async () => {
      const location = currentLocation || (await getCurrentPosition()).coords;
      const marker = getRotatedMarker(
        Platform.select({
          web: CAR_MARKER,
          native: CarMarker,
        }),
        currentLocation?.bearing || orientation,
        scaleDp(40),
      );
      setCurrenPositionMarker({
        ...location,
        ...marker,
      });
    };
    getLocation();
  }, [orientation, setCurrenPositionMarker, currentLocation]);

  const markersList = useMemo(() => {
    let list = directionsMakers ? [directionsMakers] : [];
    if (currentPositionMarker) {
      list.push(currentPositionMarker);
    }
    return list;
  }, [directionsMakers, currentPositionMarker]);

  const loadingMessage = useMemo(() => {
    if (!markersList || markersList.length === 0) {
      return 'Cargando mapa.';
    }
    return 'Cargando información del viaje';
  }, [markersList]);

  return {
    markersList: markersList,
    loadingMakers: markersList.length === 0,
    loadingMessage,
  };
};
