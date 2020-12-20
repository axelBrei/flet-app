import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Map as GoogleMap, GoogleApiWrapper} from 'google-maps-react';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {
  STYLES,
  INITIAL_POSITION,
  POIS_STYLE,
  ZOOM,
} from 'components/ui/Map/constants';
import Config from 'react-native-config';

const Map = ({google, ...props}) => {
  const {isMobile, width, height} = useWindowDimension();
  const mapRef = useRef(null);
  return (
    <View style={[styles.container, props.style]}>
      <GoogleMap
        {...ZOOM}
        initialCenter={INITIAL_POSITION}
        google={google}
        ref={mapRef}
        style={isMobile ? {width, height} : STYLES.map}
        styles={POIS_STYLE}
        containerStyle={STYLES.contentContainer}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
      />
    </View>
  );
};

export default GoogleApiWrapper({
  apiKey: Config.REACT_APP_GMAPS_API_KEY,
  language: 'es_419',
})(Map);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    left: 0,
    width: '100%',
    height: '100%',
  },
});
