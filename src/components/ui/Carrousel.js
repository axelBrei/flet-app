import React, {useRef} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';

export const Carousel = ({displayDots = true, ...props}) => {
  const {width, isMobile} = useWindowDimension();
  const scrollX = useRef(new Animated.Value(10)).current;

  const translateX = scrollX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [-10, 0, 10],
  });

  return (
    <Container>
      <Animated.FlatList
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={isMobile || width > 920}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        style={displayDots && {marginBottom: 5}}
        {...props}
      />
      {isMobile && props.data?.length > 0 && displayDots && (
        <DotsContainer>
          <DotCircle style={{transform: [{translateX}]}} />
          {props.data?.map((_, index) => (
            <DotContainer key={index.toString()}>
              <Dot />
            </DotContainer>
          ))}
        </DotsContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  padding: 0 0 10px;
  margin-bottom: 5px;
`;

const DotsContainer = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  flex-direction: row;
  position: absolute;
  bottom: 0;
`;

const DotCircle = styled(Animated.View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border-width: 1px;
  position: absolute;
  left: 0;
`;

const DotContainer = styled.View`
  height: 10px;
  width: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const Dot = styled.View`
  height: 5px;
  width: 5px;
  background-color: ${theme.primaryDarkColor};
  border-radius: 4px;
`;
