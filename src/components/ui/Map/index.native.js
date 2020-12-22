import React, {useRef, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {INITIAL_POSITION} from 'components/ui/Map/constants';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {scaleDp} from 'helpers/responsiveHelper';

const Map = ({markers, edgePadding, minMarkerAnimation}) => {
  const {height} = useWindowDimension();
  const mapRef = useRef(null);
  const filteredMarkers = useMemo(() => markers.filter((m) => !!m), [markers]);
  useEffect(() => {
    if (filteredMarkers.length > minMarkerAnimation) {
      mapRef.current.fitToSuppliedMarkers(
        filteredMarkers.map((i) => i.id),
        {
          animated: true,
          edgePadding,
        },
      );
    }
  }, [filteredMarkers, mapRef]);

  mapRef.current?.getCamera().then(console.log);
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: INITIAL_POSITION.lat,
        longitude: INITIAL_POSITION.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider="google">
      {filteredMarkers.map((marker) => (
        <Marker
          key={marker.id}
          identifier={marker.id}
          pinColor={theme.primaryColor}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        />
      ))}
    </MapView>
  );
};

Map.defaultProps = {
  markers: [],
  minMarkerAnimation: 0,
  edgePadding: {
    bottom: scaleDp(550),
    right: scaleDp(50),
    top: scaleDp(50),
    left: scaleDp(50),
  },
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
