import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
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
import {scaleDp} from 'helpers/responsiveHelper';

const Map = ({
  markers,
  minMarkerAnimation,
  renderMarker,
  edgePadding,
  ...props
}) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: Config.REACT_APP_GMAPS_API_KEY,
  });
  const [mapRef, setMapRef] = useState(null);
  const filteredMarkers = useMemo(() => markers.filter((m) => !!m), [markers]);

  const fitBounds = (map) => {
    if ('google' in window && filteredMarkers.length > minMarkerAnimation) {
      const bounds = new window.google.maps.LatLngBounds();
      filteredMarkers.forEach((marker) => {
        bounds.extend({lat: marker.latitude, lng: marker.longitude});
      });
      map.fitBounds(bounds, edgePadding);
    }
  };

  useEffect(() => {
    if (mapRef) {
      fitBounds(mapRef);
    }
  }, [mapRef, filteredMarkers]);

  const handleLoad = (map) => {
    setMapRef(map);
    fitBounds(map);
  };

  const renderMapMarker = useCallback(
    ({icon, ...marker}, index) => {
      return (
        <Marker
          key={index.toString()}
          id={marker.id}
          name={marker.id}
          color={theme.primaryColor}
          position={{
            lat: marker.latitude,
            lng: marker.longitude,
          }}
          icon={
            icon
              ? {
                  url: icon,
                  scaledSize: {height: 60, width: 60},
                }
              : WEB_PIN
          }
        />
      );
    },
    [renderMarker],
  );

  return (
    isLoaded &&
    !loadError && (
      <GoogleMap
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        zoom={ZOOM.zoom}
        clickableIcons={false}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          gestureHandling: 'greedy',
        }}
        center={INITIAL_POSITION}
        onLoad={handleLoad}>
        {filteredMarkers.map(renderMapMarker)}
      </GoogleMap>
    )
  );
};

Map.defaultProps = {
  minMarkerAnimation: 0,
  markers: [],
  renderMarker: null,
  edgePadding: null,
};
export default React.memo(Map);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    left: 0,
    width: '100%',
    height: '100%',
  },
});
