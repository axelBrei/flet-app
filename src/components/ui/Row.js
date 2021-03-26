import styled from 'styled-components';

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${(props) => (props.disablePadding ? 0 : 10)}px;
`;
