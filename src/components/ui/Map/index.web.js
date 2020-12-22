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

  const onLoadMarker = useCallback((marker) => {
    const customIcon = (opts) =>
      Object.assign(
        {
          path:
            'M7.8,1.3L7.8,1.3C6-0.4,3.1-0.4,1.3,1.3c-1.8,1.7-1.8,4.6-0.1,6.3c0,0,0,0,0.1,0.1 l3.2,3.2l3.2-3.2C9.6,6,9.6,3.2,7.8,1.3C7.9,1.4,7.9,1.4,7.8,1.3z M4.6,5.8c-0.7,0-1.3-0.6-1.3-1.4c0-0.7,0.6-1.3,1.4-1.3 c0.7,0,1.3,0.6,1.3,1.3 C5.9,5.3,5.3,5.9,4.6,5.8z',
          fillColor: '#f00',
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 1,
          scale: 3.5,
        },
        opts,
      );

    marker.setIcon(
      customIcon({
        fillColor: 'green',
        strokeColor: 'white',
      }),
    );
    return markerLoadHandler(marker, place);
  }, []);

  console.log(google.maps.SymbolPath);
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
