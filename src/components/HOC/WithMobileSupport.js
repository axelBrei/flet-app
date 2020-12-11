import React from 'react';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

const Content = ({Web, Mobile, ...rest}) => {
  const {isMobile} = useWindowDimension();
  if (isMobile) {
    return <Mobile {...rest} />;
  }
  return <Web {...rest} />;
};

export const WithMobileSupport = (WebComponent, MobileComponent) => {
  return (p) => <Content {...p} Web={WebComponent} Mobile={MobileComponent} />;
};
