import {useCallback, useEffect, useState} from 'react';
import {useFormik} from 'formik';

export const useFormikCustom = (formikConfig) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setFieldTouched, setFieldValue, ...formikProps} = useFormik(
    formikConfig,
  );

  useEffect(() => {
    if (formikProps.isSubmitting) {
      setTimeout(() => {
        setIsSubmitting(true);
      }, 300);
    } else {
      setIsSubmitting(false);
    }
  }, [formikProps.isSubmitting]);

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

  const handleSubmit = useCallback(
    (...params) => {
      formikProps.handleSubmit(...params);
    },
    [formikProps.isSubmitting],
  );

  return {
    ...formikProps,
    isSubmitting,
    handleSubmit,
    setFieldTouched,
    _setFieldTouched,
    _setFieldValue,
  };
};
