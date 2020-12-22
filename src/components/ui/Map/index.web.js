import React, {useRef, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Map as GoogleMap, GoogleApiWrapper, Marker} from 'google-maps-react';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {
  STYLES,
  INITIAL_POSITION,
  POIS_STYLE,
  ZOOM,
  WEB_PIN,
} from 'components/ui/Map/constants';
import Config from 'react-native-config';
import {theme} from 'constants/theme';
import MapPinImage from 'resources/assets/map_pin.svg';

const Map = ({google, markers, minMarkerAnimation, ...props}) => {
  const {isMobile, width, height} = useWindowDimension();
  const mapRef = useRef();
  const filteredMarkers = useMemo(() => markers.filter((m) => !!m), [markers]);

  useEffect(() => {
    if (
      filteredMarkers &&
      filteredMarkers.length > minMarkerAnimation &&
      mapRef.current.map
    ) {
      const bounds = new google.maps.LatLngBounds();

      filteredMarkers.forEach((marker) => {
        if (!marker.latitude || !marker.longitude) {
          return;
        }
        bounds.extend(
          new google.maps.LatLng(marker.latitude, marker.longitude),
        );
      });
      mapRef.current.map.fitBounds(bounds);
    }
  }, [filteredMarkers, google, mapRef]);

  return (
    <View style={[styles.container, props.style]}>
      <GoogleMap
        {...ZOOM}
        initialCenter={INITIAL_POSITION}
        center={INITIAL_POSITION}
        google={google}
        ref={mapRef}
        style={isMobile ? {width, height} : STYLES.map}
        styles={POIS_STYLE}
        containerStyle={STYLES.contentContainer}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}>
        {filteredMarkers.map((marker) => (
          <Marker
            id={marker.id}
            color={theme.primaryColor}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            icon={WEB_PIN}
          />
        ))}
      </GoogleMap>
    </View>
  );
};

Map.defaultProps = {
  minMarkerAnimation: 0,
  markers: [],
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
