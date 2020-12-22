import axios from 'axios';

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

export default {
  geocodeAddress,
};
