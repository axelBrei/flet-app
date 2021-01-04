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
import {selectCurrentDirections} from 'redux-store/slices/geolocationSlice';
import {trackUserPosition} from 'helpers/locationHelper';
import {getBearingFromCoords} from 'helpers/locationHelper';
import {scaleDp} from 'helpers/responsiveHelper';
import {RotateIcon} from 'components/navigation/DriverNewShipmentScreen/constants';

export const useMarkerList = () => {
  const [lastUserPosition, setLastUserPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const isPackagePickedUp = useSelector(selectIsDriverShipmentPickedUp);
  const shipmentData = useSelector(selectDriverShipmentData);
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
      if (directions) {
        const res = getBearingFromCoords(directions[0], directions[1]);
        return res;
      }
      return 0;
    }
    return getBearingFromCoords(lastUserPosition, currentLocation);
  }, [lastUserPosition, currentLocation, directions]);

  const markersList = useMemo(() => {
    let dirs = [];
    if (directions) {
      dirs = [
        {
          ...directions[0],
        },
        {
          ...directions[directions.length - 1],
          anchor: {
            x: 0.75,
            y: 0.9,
          },
          icon: Platform.select({
            native: EndpointMarker,
            web: ENDPOINT_MARKER_PNG,
          }),
        },
      ];
    }
    if (currentLocation) {
      const icon = new RotateIcon({url: CAR_MARKER}).setRotation({
        deg: orientation,
      });
      dirs.push({
        ...currentLocation,
        anchor: {
          x: 0.5,
          y: 0.4,
        },
        iconOptions: {
          title: 'currentPosition',
          scaledSize: {height: scaleDp(40), width: scaleDp(40)},
          anchor: {x: scaleDp(20), y: scaleDp(20)},
          url: icon.getUrl(),
        },
        renderIcon: () => (
          <View
            style={{
              overflow: 'visible',
              transform: [{rotate: `${orientation}deg`}],
            }}>
            <CarMarker height={scaleDp(60)} width={scaleDp(60)} />
          </View>
        ),
      });
    }
    return dirs;
  }, [
    directions,
    isPackagePickedUp,
    currentLocation,
    shipmentData,
    orientation,
  ]);

  return markersList;
};
