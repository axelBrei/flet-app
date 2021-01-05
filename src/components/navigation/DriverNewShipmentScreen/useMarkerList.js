import React, {useState, useMemo, useEffect} from 'react';
import {View, Platform} from 'react-native';
import EndpointMarker from 'resources/assets/endpoint_marker.svg';
import ENDPOINT_MARKER_PNG from 'resources/assets/endpoint_marker.png';
import CarMarker from 'resources/assets/driver_car.svg';
import CAR_MARKER from 'resources/assets/driver_car.png';
import {useSelector} from 'react-redux';
import {
  selectDriverShipmentData,
  selectIsDriverShipmentPickedUp,
} from 'redux-store/slices/driverShipmentSlice';
import {
  selectCurrentDirections,
  selectLoadingDirections,
} from 'redux-store/slices/geolocationSlice';
import {getCurrentPosition, trackUserPosition} from 'helpers/locationHelper';
import {getBearingFromCoords} from 'helpers/locationHelper';
import {scaleDp} from 'helpers/responsiveHelper';
import {getRotatedMarker} from 'components/ui/Map/helper';

export const useMarkerList = () => {
  const [lastUserPosition, setLastUserPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionsMakers, setDirectionsMakers] = useState(null);
  const [currentPositionMarker, setCurrenPositionMarker] = useState(null);
  const loadingDirections = useSelector(selectLoadingDirections);
  const directions = useSelector(selectCurrentDirections);

  useEffect(() => {
    return trackUserPosition(
      (position) => {
        if (position.coords.latitude !== currentLocation?.latitude) {
          setLastUserPosition(currentLocation);
          setCurrentLocation(position.coords);
        }
      },
      (e) => console.log('track error', e),
      {useSignificantChanges: true}, // avoids refresh every second
    );
  }, [currentLocation]);

  const orientation = useMemo(() => {
    if (!lastUserPosition) {
      if (directions.length > 1) {
        const res = getBearingFromCoords(directions[0], directions[1]);
        return res;
      }
      return 0;
    }
    if (currentLocation) {
      return getBearingFromCoords(lastUserPosition, currentLocation);
    }
    return 0;
  }, [lastUserPosition, currentLocation, directions]);

  useEffect(() => {
    if (directions) {
      setDirectionsMakers({
        ...directions[directions.length - 1],
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
  }, [directions, setDirectionsMakers]);

  useEffect(() => {
    const getLocation = async () => {
      const location = currentLocation || (await getCurrentPosition()).coords;
      const marker = getRotatedMarker(
        Platform.select({
          web: CAR_MARKER,
          native: CarMarker,
        }),
        orientation,
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
    if (loadingDirections) {
      return 'Buscando direcciones';
    }
    if (!markersList || markersList.length === 0) {
      return 'Cargando mapa.';
    }
    return 'Cargando información del viaje';
  }, [markersList, loadingDirections]);

  return {
    markersList: markersList,
    loadingMakers: markersList.length === 0,
    loadingDirections,
    loadingMessage,
  };
};
