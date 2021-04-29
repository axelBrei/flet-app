import React from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';

export const CommonList = styled.FlatList`
  flex: 1;
  min-height: 100px;
`;

CommonList.defaultProps = {
  keyExtractor: (_, i) => i.toString(),
  EmptyListComponent: () => <Title>Error</Title>,
};
