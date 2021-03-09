import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const defaultParams = {
  region: 'es',
  key: Config.REACT_APP_GMAPS_API_KEY,
  language: 'es',
};

const geocodeAddress = async (street) =>
  await axios.get(BASE_URL, {
    params: {
      ...defaultParams,
      address: street,
    },
  });

const directionsUrl = 'https://maps.googleapis.com/maps/api/directions/json';
const getDirections = async (origin, destination) =>
  await axios.get(
    Platform.select({
      web:
        // process.env.NODE_ENV === 'development' ?
        'https://run.mocky.io/v3/8a41af54-3298-44fc-a261-c33de5b2fa9f', // TODO: creato google account
      // : directionsUrl,
      native: directionsUrl,
    }),
    {
      timeout: 2000,
      headers: process.env.NODE_ENV !== 'development' && {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json; charset=UTF-8',
      },
      params: {
        region: 'es',
        origin,
        destination,
        key:
          process.env.NODE_ENV !== 'development' &&
          Config.REACT_APP_GMAPS_API_KEY,
      },
    },
  );

export default {
  geocodeAddress,
  getDirections,
};
