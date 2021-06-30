import React from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {Title} from 'components/ui/Title';

export const PlaceItemHeader = ({data, icon, title, expanded, ...props}) => (
  <Container onPress={props?.onPress}>
    <Icon name={icon} size={24} />
    <Title style={{flex: 1, marginBottom: 0, marginLeft: 5}}>{title}</Title>
    <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
  </Container>
);

const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  padding: 10px 0;
  align-items: center;
`;
