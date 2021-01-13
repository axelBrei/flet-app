import React, {useState, useCallback, useMemo} from 'react';
import {isHoverEnabled} from 'helpers/hoverHelper';

export default ({children, onHoverIn, onHoverOut}) => {
  const [showHover, setShowHover] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const child = useMemo(
    () =>
      typeof children === 'function'
        ? children(showHover && isHovered)
        : children,
    [children, isHovered, showHover],
  );

  const onMouseEnter = useCallback(
    (e) => {
      if (isHoverEnabled() && !isHovered) {
        if (onHoverIn) onHoverIn();
        setIsHovered(true);
      }
    },
    [isHovered, setIsHovered],
  );

  const onMouseLeave = useCallback(
    (e) => {
      if (isHovered) {
        if (onHoverOut) onHoverOut();
        setIsHovered(false);
      }
    },
    [isHovered, setIsHovered],
  );

  const onResponderGrant = useCallback(() => setShowHover(false), [
    setShowHover,
  ]);

  const onResponderRelease = useCallback(() => setShowHover(true), [
    setShowHover,
  ]);

  return React.cloneElement(React.Children.only(child), {
    onMouseEnter,
    onMouseLeave,
    // prevent hover showing while responder
    onResponderGrant,
    onResponderRelease,
    // if child is Touchable
    onPressIn: onResponderGrant,
    onPressOut: onResponderRelease,
  });
};
