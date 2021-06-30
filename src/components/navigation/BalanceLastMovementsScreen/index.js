import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import Screen from 'components/ui/Screen';
import {CommonList} from 'components/ui/CommonList';
import {useSelector} from 'react-redux';
import {selectCourrierBalance} from 'redux-store/slices/balanceSlice';
import {LastMovementItem} from 'components/navigation/BalanceLastMovementsScreen/LastMovementItem';
import dayjs from 'dayjs';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';

export default () => {
  const {lastMovements} = useSelector(selectCourrierBalance);

  const list = useMemo(() => {
    return lastMovements?.reduce((acc, curr, i, arr) => {
      const date = dayjs(curr.createdAt).format('DD/MM/YYYY');
      const item = acc.find(item => item.title === date);
      if (item) {
        item.data.push({...curr});
      } else {
        acc.push({
          title: date,
          data: [curr],
        });
      }
      return acc;
    }, []);
  }, [lastMovements]);

  const renderHeader = useCallback(({section}) => {
    const total = section.data.reduce(
      (tot, item) => tot + item.transactionAmount,
      0,
    );
    return (
      <Row>
        <Title>{section.title}</Title>
        <Title>Total dia: ${total}</Title>
      </Row>
    );
  }, []);

  return (
    <Screen removeTWF>
      <List
        sections={list}
        stickySectionHeadersEnabled
        keyExtractor={(_, i) => i.toString()}
        renderSectionHeader={renderHeader}
        renderItem={LastMovementItem}
        getItemLayout={(data, index) => ({
          length: 55,
          offset: 55 * index,
          index,
        })}
      />
    </Screen>
  );
};

const List = styled.SectionList`
  width: 100%;
  height: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  height: 55px;
  width: 100%;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.backgroundColor};
`;
