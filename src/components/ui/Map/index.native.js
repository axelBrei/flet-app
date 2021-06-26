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
import {applyShadow} from 'helpers/uiHelper';

const Map = ({
  markers,
  edgePadding,
  minMarkerAnimation,
  directions,
  showsMyLocationButton,
  accesible,
  externalRef,
  ...props
}) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef(null);
  const filteredMarkers = useMemo(() => markers.filter(m => !!m), [markers]);

  const fitToMarkers = useCallback(() => {
    // let options = {animated: true};
    // if (edgePadding) {
    //   options.edgePadding = edgePadding;
    //   mapRef.current?.fitToCoordinates(
    //     filteredMarkers.map(marker => ({
    //       latitude: marker.latitude,
    //       longitude: marker.longitude,
    //     })),
    //     options,
    //   );
    // if (filteredMarkers.length === 1) {
    //   mapRef.current?.setCamera({
    //     ...mapRef.current?.getCamera(),
    //     zoom: 16,
    //   });
    // }
    // } else
    mapRef.current?.fitToElements(true);
  }, [mapRef, filteredMarkers, edgePadding]);

  useEffect(() => {
    if (filteredMarkers.length >= minMarkerAnimation) {
      fitToMarkers();
    }
  }, [filteredMarkers, minMarkerAnimation]);

  useEffect(() => {
    if (directions) {
      mapRef.current?.fitToElements({
        animated: true,
      });
    }
  }, [directions]);

  const onMapReady = useCallback(() => {
    setIsMapReady(true);
    if (filteredMarkers.length > 0) fitToMarkers();
  }, [mapRef]);

  const renderMarkers = useCallback(
    ({icon: SvgIcon, renderIcon, ...marker}, index) =>
      marker.latitude &&
      marker.longitude && (
        <Marker
          key={`${marker.latitude}${marker.longitude}`}
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
            <SvgIcon height={30} width={30} />
          ) : (
            <Icon name="map-marker" size={32} color={theme.primaryColor} />
          )}
        </Marker>
      ),
    [],
  );

  const centerOnUserLocation = useCallback(async () => {
    const {coords} = await getCurrentPosition();
    mapRef.current.animateCamera({center: coords, zoom: 16});
  }, [mapRef]);

  const renderDirections = useCallback(() => {
    if (isMapReady && directions) {
      const dirs = directions.map(i => ({
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

  React.useImperativeHandle(externalRef, () => ({
    fitToMarkers,
    centerOnUserLocation,
  }));

  return (
    <>
      <MapView
        classname={props.classname}
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
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        mapPadding={edgePadding}
        showsIndoors={false}
        showsTraffic={false}
        showsIndoorLevelPicker={false}
        zoomControlEnabled={accesible}
        pitchEnabled={accesible}
        zoomEnabled={accesible}
        zoomTapEnabled={accesible}
        scrollEnabled={accesible}>
        {filteredMarkers.map(renderMarkers)}
        {renderDirections()}
      </MapView>
      {showsMyLocationButton && (
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

export default React.forwardRef((props, ref) => (
  <Map externalRef={ref} {...props} />
));

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
CurrentLoactionButton.defaultProps = applyShadow();
