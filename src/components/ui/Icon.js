import React from 'react';
import {scaleDp} from 'helpers/responsiveHelper';
const VectorIcon = require('react-native-vector-icons/MaterialCommunityIcons')
  .default;

export const Icon = ({...props}) => {
  return <VectorIcon size={scaleDp(12)} {...props} />;
};
