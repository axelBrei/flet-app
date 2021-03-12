import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {StyleSheet, Platform, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {INITIAL_POSITION} from 'components/ui/Map/constants';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Icon} from 'components/ui/Icon';
import styled from 'styled-components';
import {IconButton} from 'components/ui/IconButton';
import {getCurrentPosition} from 'helpers/locationHelper';

const Map = ({
  markers,
  edgePadding,
  minMarkerAnimation,
  directions,
  showsMyLocationButton,
  ...props
}) => {
  const [isMapReady, setIsMapReady] = useState(false);
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

  useEffect(() => {
    if (directions) {
      mapRef.current?.fitToElements(true);
    }
  }, [directions]);

  const onMapReady = useCallback(() => {
    setIsMapReady(true);
    if (filteredMarkers.length > 0) mapRef.current.fitToElements(true);
  }, [mapRef]);

  const renderMarkers = useCallback(
    ({icon: SvgIcon, renderIcon, ...marker}, index) =>
      marker.latitude &&
      marker.longitude && (
        <Marker
          key={`${index}`}
          identifier={`${index}`}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          anchor={{
            x: marker?.anchor?.x || 0.5,
            y: marker?.anchor?.y || 1,
          }}>
          {renderIcon ? (
            renderIcon()
          ) : SvgIcon ? (
            <SvgIcon height={scaleDp(35)} width={scaleDp(35)} />
          ) : (
            <Icon
              name="map-marker"
              size={scaleDp(30)}
              color={theme.primaryColor}
            />
          )}
        </Marker>
      ),
    [],
  );

  const centerOnUserLocation = useCallback(async () => {
    const {coords} = await getCurrentPosition();
    mapRef.current.animateCamera({center: coords});
  }, [mapRef]);

  const renderDirections = useCallback(() => {
    if (isMapReady && directions) {
      const dirs = directions.map((i) => ({
        latitude: i[0],
        longitude: i[1],
      }));
      return (
        <MapView.Polyline
          coordinates={dirs}
          strokeWidth={scaleDp(4)}
          strokeColor={theme.primaryLightColor}
        />
      );
    }
  }, [directions, isMapReady]);

  return (
    <>
      <MapView
        ref={mapRef}
        onMapReady={onMapReady}
        style={[styles.map, props.style]}
        initialRegion={{
          latitude: INITIAL_POSITION.lat,
          longitude: INITIAL_POSITION.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        rotateEnabled={false}
        {...props}
        showsPointsOfInterest={false}
        showsMyLocationButton={
          Platform.OS === 'android' && showsMyLocationButton
        }
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsIndoors={false}
        showsTraffic={false}
        showsIndoorLevelPicker={false}>
        {filteredMarkers.map(renderMarkers)}
        {renderDirections()}
      </MapView>
      {Platform.OS === 'ios' && showsMyLocationButton && (
        <CurrentLoactionButton
          onPress={centerOnUserLocation}
          icon="crosshairs-gps"
          iconColor={theme.fontColor}
          size={20}
        />
      )}
    </>
  );
};

Map.defaultProps = {
  markers: [],
  directions: null,
  minMarkerAnimation: 0,
  edgePadding: null,
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});

const CurrentLoactionButton = styled(IconButton)`
  position: absolute;
  top: ${scaleDpTheme(10)};
  right: ${scaleDpTheme(10)};
  height: ${scaleDpTheme(42)};
  width: ${scaleDpTheme(42)};
  align-items: center;
  justify-content: center;
  border-radius: ${scaleDpTheme(30)};
  background-color: ${theme.backgroundColor};
  elevation: 3;
  box-shadow: 0px 3px 6px ${theme.shadowColor};
`;
