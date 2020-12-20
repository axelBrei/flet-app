import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from './index.native';
import {OrderForm} from 'components/navigation/HomeScreen/OrderForm';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import Map from 'components/ui/Map/index';
import {usePermission} from 'components/Hooks/usePermission';
import {PERMISSIONS} from 'components/Permissions/permissions';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

const HomeScreen = () => {
  const {width, height} = useWindowDimension();
  const {loading, status, check} = usePermission([PERMISSIONS.location]);

  useEffect(() => {
    check();
  }, []);

  return (
    <ScreenComponent>
      <Map style={{width, height}} />
      <OrderContainer>
        <OrderForm />
      </OrderContainer>
    </ScreenComponent>
  );
};

export default WithMobileSupport(HomeScreen, MobileScreen);

const ScreenComponent = styled(Screen)`
  align-items: flex-start;
  height: ${(props) => props.theme.screenHeight}px;
  width: 100%;
  padding: ${scaleDpTheme(20)} 0;
`;

const OrderContainer = styled(Container)`
  background-color: ${theme.white};
  position: absolute;
  top: ${scaleDpTheme(20)};
  left: ${scaleDpTheme(15)};
  padding: ${scaleDpTheme(10)} ${scaleDpTheme(15)};
  border-radius: ${scaleDpTheme(8)};
  box-shadow: 0 3px 6px ${theme.shadowColor};
`;
