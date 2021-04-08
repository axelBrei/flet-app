import React, {useMemo, useRef, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {MainButton} from 'components/ui/MainButton';
import {Row} from 'components/ui/Row';
import {Title} from 'components/ui/Title';
import {FlatList} from 'react-native';
import {useModalContext} from 'components/Hooks/useModal';

const CommonList = ({data, renderItem, ...props}) => {
  const listRef = useRef();
  const config = useRef({
    waitForInteraction: true,
    minimumViewTime: 400,
    itemVisiblePercentThreshold: 100,
  });

  useEffect(() => {
    listRef.current?.scrollToOffset({
      animated: false,
      offset: 20 * 40, //data?.length / 2,
    });
  }, [data]);

  return (
    <FlatList
      style={{height: 190, width: '50%'}}
      snapToInterval={40}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onScrollToIndexFailed={() => console.log('scrollToIndexErr')}
      data={[null, null, ...data, null, null]}
      ref={listRef}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderItem}
      viewabilityConfig={config.current}
      getItemLayout={(_, index) => ({
        length: 40,
        offset: index * 40,
        index,
      })}
      {...props}
    />
  );
};

export default ({onPressAccept}) => {
  const {closeModal} = useModalContext();
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);

  const onHoursViewAbilityItemsChange = useRef(({viewableItems}) => {
    let {item, index} = viewableItems[2] || {};
    let res = item;
    if (!item) {
      res = index < 2 ? '1' : '24';
    }
    console.log(res);
    res && setHour(res);
  });

  const onMinutesViewAbilityItemsChange = useRef(({viewableItems}) => {
    let {item, index} = viewableItems[2] || {};
    let res = item;
    if (!item) {
      res = index < 2 ? '1' : '59';
    }
    res && setMinute(res);
  });

  const renderItem = ({item}) => (
    <ItemContainer>
      <Title textAlign="center">{item}</Title>
    </ItemContainer>
  );

  const hours = useMemo(
    () => new Array(24).fill(null).map((_, i) => (i + 1).toString()),
    [],
  );

  const minutes = useMemo(
    () => new Array(59).fill(null).map((_, i) => i.toString()),
    [],
  );

  const _onPressAccept = useCallback(() => {
    onPressAccept({hour, minute});
    closeModal();
  }, [onPressAccept, hour, minute]);

  return (
    <Container>
      <Title>Seleccioná un horario</Title>
      <Row>
        <SelectionBand />
        <CommonList
          data={hours}
          renderItem={renderItem}
          onViewableItemsChanged={onHoursViewAbilityItemsChange.current}
        />
        <CommonList
          data={minutes}
          renderItem={renderItem}
          onViewableItemsChanged={onMinutesViewAbilityItemsChange.current}
        />
      </Row>
      <MainButton onPress={_onPressAccept}>Aceptar</MainButton>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${theme.white};
  padding: 10px 20px 20px;
  min-height: 300px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const ItemContainer = styled.View`
  height: 40px;
`;

const SelectionBand = styled.View`
  background-color: ${theme.grayBackground};
  position: absolute;
  top: 40%;
  bottom: 60%;
  left: 0;
  right: 0;
  border-radius: 20px;
  height: 35px;
`;
