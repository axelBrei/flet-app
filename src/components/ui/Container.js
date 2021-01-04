import styled, {css} from 'styled-components';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export const Container = styled(View)`
  flex-direction: ${(props) => props.dir};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  width: ${(props) => props.width || 'auto'};
  padding: ${(props) => props.padding};
  ${(props) => props.flex && 'flex: 1;'}
`;

Container.defaultProps = {
  dir: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: 'auto',
  padding: 0,
};
Container.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dir: PropTypes.oneOf(['column', 'row', 'row-reverse', 'column-reverse']),
};
