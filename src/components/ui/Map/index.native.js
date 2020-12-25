import React, {useCallback, useRef, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {INITIAL_POSITION} from 'components/ui/Map/constants';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {scaleDp} from 'helpers/responsiveHelper';
import {Icon} from 'components/ui/Icon';

const Map = ({markers, edgePadding, minMarkerAnimation}) => {
  const {height} = useWindowDimension();
  const mapRef = useRef(null);
  const filteredMarkers = useMemo(() => markers.filter((m) => !!m), [markers]);

  useEffect(() => {
    if (filteredMarkers.length > minMarkerAnimation && edgePadding) {
      mapRef.current?.fitToSuppliedMarkers(
        filteredMarkers.map((_, i) => `${i}`),
        {
          animated: true,
          edgePadding,
        },
      );
    }
  }, [filteredMarkers, mapRef, edgePadding]);

  const onMapReady = useCallback(() => {
    if (filteredMarkers.length > 0) mapRef.current.fitToElements(true);
  }, [mapRef]);

  return (
    <MapView
      ref={mapRef}
      onMapReady={onMapReady}
      style={styles.map}
      initialRegion={{
        latitude: INITIAL_POSITION.lat,
        longitude: INITIAL_POSITION.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider="google">
      {filteredMarkers.map(({icon: SvgIcon, ...marker}, index) => (
        <Marker
          key={`${index}`}
          identifier={`${index}`}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}>
          {SvgIcon ? (
            <SvgIcon height={scaleDp(35)} />
          ) : (
            <Icon
              name="map-marker"
              size={scaleDp(30)}
              color={theme.primaryColor}
            />
          )}
        </Marker>
      ))}
    </MapView>
  );
};

Map.defaultProps = {
  markers: [],
  minMarkerAnimation: 0,
  edgePadding: null,
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
