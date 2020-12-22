import React, {useState, useCallback, useEffect} from 'react';
import {useDebounce} from 'components/Hooks/useDebounce';
import geocodingService from 'services/geocodingService';
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
      const {data} = await geocodingService.geocodeAddress(
        debouncedInputValue.split(',')[0],
      );
      const addressList = data.direcciones
        .map((item) => ({
          id: item.calle.id,
          latitude: item.ubicacion.lat,
          longitude: item.ubicacion.lon,
          name: capitallize(item.nomenclatura, true),
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
