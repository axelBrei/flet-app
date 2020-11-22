import {useCallback} from 'react';
import {useFormik} from 'formik';

export const useFormikCustom = (formikConfig) => {
  const {setFieldTouched, setFieldValue, ...formikProps} = useFormik(
    formikConfig,
  );

  const _setFieldTouched = useCallback(
    (field) => () => setFieldTouched(field, true, true),
    [setFieldTouched],
  );

  const _setFieldValue = useCallback(
    (field) => (value) => {
      setFieldValue(field, value, true);
    },
    [setFieldValue],
  );

  return {
    ...formikProps,
    setFieldTouched,
    _setFieldTouched,
    _setFieldValue,
  };
};
