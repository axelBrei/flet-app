import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = 'https://apis.datos.gob.ar/georef/api/direcciones';
// ?direccion=Colpayo 760&campos=altura.valor, calle.nombre,calle.categoria,ubicacionhttps://apis.datos.gob.ar/georef/api/direcciones?direccion=Colpayo 760&campos=altura.valor, calle.nombre,calle.categoria,ubicacion
// ?street:Aranguren%201460&country:Argentina&state:BuenosAires&format:json&addressdetails:1&limit:3&postalcode:1405

const defaultParams = {
  // country: 'Argentina',
  // state: 'BuenosAires',
  // format: 'json',
  // addressdetails: 1,
  // limit: 3,
  campos:
    'altura.valor,,calle.id,calle.nombre,ubicacion,localidad_censal,nomenclatura',
  formato: 'json',
  orden: 'id',
};

const geocodeAddress = async (street) =>
  await axios.get(BASE_URL, {
    params: {
      ...defaultParams,
      direccion: street,
    },
  });

const getDirections = async (origin, destination) =>
  await axios.get(
    // 'https://maps.googleapis.com/maps/api/directions/json',
    'https://run.mocky.io/v3/8a41af54-3298-44fc-a261-c33de5b2fa9f',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json; charset=UTF-8',
      },
      params: {
        region: 'es',
        origin,
        destination,
        key: Config.REACT_APP_GMAPS_API_KEY,
      },
    },
  );

export default {
  geocodeAddress,
  getDirections,
};
