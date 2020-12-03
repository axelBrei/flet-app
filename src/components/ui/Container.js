import styled, {css} from 'styled-components';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export const Container = styled(View)`
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};

  ${(props) => props.flex && 'flex: 1;'}
`;

Container.defaultProps = {
  direction: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
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
