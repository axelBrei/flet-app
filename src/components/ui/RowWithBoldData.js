import React from 'react';
import {AppText} from 'components/ui/AppText';

export const RowWithBoldData = ({
  label,
  data,
  alternative = true,
  ...props
}) => (
  <AppText alternative={alternative} {...props}>
    {label}{' '}
    <AppText color={props.color} bold alternative={alternative}>
      {data}
    </AppText>
  </AppText>
);
