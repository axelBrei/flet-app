import React from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {CommonList} from 'components/ui/CommonList';
import {useSelector} from 'react-redux';
import {selectCourrierBalance} from 'redux-store/slices/balanceSlice';
import {LastMovementItem} from 'components/navigation/BalanceLastMovementsScreen/LastMovementItem';

export default () => {
  const {lastMovements} = useSelector(selectCourrierBalance);

  return (
    <Screen removeTWF>
      <CommonList data={lastMovements} renderItem={LastMovementItem} />
    </Screen>
  );
};
