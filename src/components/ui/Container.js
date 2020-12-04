import styled, {css} from 'styled-components';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export const Container = styled(View)`
  flex-direction: ${(props) => props.dir};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  width: ${(props) => props.width || 'auto'};
  ${(props) => props.flex && 'flex: 1;'}
`;

Container.defaultProps = {
  dir: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: 'auto',
};
Container.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  direction: PropTypes.oneOf([
    'column',
    'row',
    'row-reverse',
    'column-reverse',
  ]),
};
