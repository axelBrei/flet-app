import React, {useState, useCallback, useEffect} from 'react';
import {useDebounce} from 'components/Hooks/useDebounce';
import geocodingService from 'services/geolocationService';
import axios from 'axios';
import {capitallize} from 'helpers/stringHelper';

export const useDebouncedGeocoding = (inputValue) => {
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
          name: capitallize(item.formatted_address, true),
        }))
        .filter(
          (address, index, self) =>
            index === self.findIndex((t) => t.id === address.id),
        );
      setResults(addressList);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, [debouncedInputValue]);

  useEffect(() => {
    debouncedInputValue.length > 3 && fetchAddresses();
  }, [debouncedInputValue]);

  return {
    loading,
    error,
    results,
  };
};
