import React from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from './index.native';
import {OrderForm} from 'components/navigation/HomeScreen/OrderForm';
import {Container} from 'components/ui/Container';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

const HomeScreen = () => {
  return (
    <ScreenComponent>
      <OrderContainer>
        <OrderForm />
      </OrderContainer>
    </ScreenComponent>
  );
};

export default WithMobileSupport(HomeScreen, MobileScreen);

const ScreenComponent = styled(Screen)`
  flex: 1;
  align-items: flex-start;
`;

const OrderContainer = styled(Container)`
  background-color: ${theme.white};
  position: relative;
  top: ${scaleDpTheme(15)};
  left: ${scaleDpTheme(15)};
  padding: ${scaleDpTheme(10)} ${scaleDpTheme(15)};
  border-radius: ${scaleDpTheme(8)};
  box-shadow: 0 3px 6px ${theme.shadowColor};
`;
