import React from 'react';
import {AppText} from 'components/ui/AppText';

export const RowWithBoldData = ({label, data, ...props}) => (
  <AppText alternative {...props}>
    {label}{' '}
    <AppText bold alternative>
      {data}
    </AppText>
  </AppText>
);
