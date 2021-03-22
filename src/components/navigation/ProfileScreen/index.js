import React from 'react';
import {Screen} from 'components/ui/Screen';
import {LogoutButton} from 'components/ui/LogoutButton';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export default () => {
  const {isMobile} = useWindowDimension();
  return <Screen>{isMobile && <LogoutButton />}</Screen>;
};
