import {View, Platform} from 'react-native';
import React from 'react';

export const getRotatedMarker = Platform.select({
  web: (image, rotation, size) => {
    const {getRotatedImage} = require('helpers/imageHelper');
    const icon = getRotatedImage(image, rotation);
    return {
      icon: icon.getUrl(),
      iconOptions: {
        title: 'currentPosition',
        scaledSize: {height: size, width: size},
        anchor: {x: size / 2, y: size / 2},
      },
    };
  },
  native: (SvgImage, rotation, size) => {
    return {
      anchor: {
        x: 0.5,
        y: 0.4,
      },
      // Recomended size for native scaleDp(60);
      renderIcon: () => (
        <View
          style={{
            overflow: 'visible',
            padding: 10,
            transform: [{rotate: `${rotation}deg`}],
          }}>
          <SvgImage height={size} width={size} />
        </View>
      ),
    };
  },
});
