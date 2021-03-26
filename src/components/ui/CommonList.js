import React from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';

export const CommonList = styled.FlatList``;

CommonList.defaultProps = {
  keyExtractor: (_, i) => i.toString(),
  EmptyListComponent: () => <Title>Error</Title>,
};
