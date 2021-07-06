import React, {useState, useCallback, useEffect} from 'react';
import {useDebounce} from 'components/Hooks/useDebounce';
import geocodingService from 'services/geolocationService';
import axios from 'axios';
import {capitallize} from 'helpers/stringHelper';

const getAddressName = address => {
  const components = address.address_components.reduce(
    (a, c) => ({...a, [c.types[0]]: c}),
    {},
  );
  const name =
    `${components?.route?.short_name} ${components?.street_number?.short_name}, `
      .concat(`${components?.postal_code?.short_name}, `)
      .concat(`${components?.political?.short_name}, `)
      .concat(`${components?.administrative_area_level_1?.short_name}, `)
      .concat(`${components?.country?.long_name}`);
  return capitallize(name, true);
};

export const useDebouncedGeocoding = (
  inputValue,
  enabled = true,
  onFetchSuccess = () => {},
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, 400);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await geocodingService.geocodeAddress(debouncedInputValue);
      if (data?.status !== 'OK') {
        setLoading(false);
        setError('No se encontraron lugares para la dirección ingresada');
        return;
      }
      const addressList = data.results
        .map((item, index) => ({
          id: index,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
          name: getAddressName(item),
        }))
        .filter(
          (address, index, self) =>
            index === self.findIndex(t => t.id === address.id),
        );
      setResults(addressList);
      onFetchSuccess(addressList);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, [debouncedInputValue]);

  useEffect(() => {
    enabled && debouncedInputValue.length > 3 && fetchAddresses();
  }, [enabled, debouncedInputValue]);

  return {
    loading,
    error,
    results,
  };
};
