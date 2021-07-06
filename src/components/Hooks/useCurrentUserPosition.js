import Geolocation from '@react-native-community/geolocation';
import {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectCurrentPosition} from 'redux-store/slices/driverSlice';
import {Platform} from 'react-native';

export const useCurrentUserPosition = () => {
  const currentPosition = useSelector(selectCurrentPosition);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (currentPosition?.latitude !== null) {
        if (Platform.OS !== 'ios') {
          Geolocation.getCurrentPosition(setCurrent, setError);
        }
        const stopObserving = Geolocation.watchPosition(setCurrent, setError);
        return () => {
          try {
            stopObserving?.();
          } catch (e) {}
        };
      }
    }, [currentPosition]),
  );

  return {
    currentPosition: currentPosition?.latitude ? currentPosition : current,
    error,
  };
};
