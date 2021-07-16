import React, {
  useState,
  useCallback,
  useMemo,
  useImperativeHandle,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from '@react-google-maps/api';
import MAP_PIN from 'resources/assets/map_pin.png';
import {INITIAL_POSITION, ZOOM} from 'components/ui/Map/constants';
import Config from 'react-native-config';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import {getCurrentPosition} from 'helpers/locationHelper';
import {IconButton} from 'components/ui/IconButton';
import {applyShadow} from 'helpers/uiHelper';

const Map = ({
  markers,
  minMarkerAnimation,
  accesible,
  renderMarker,
  edgePadding,
  directions,
  externalRef,
  showsMyLocationButton,
  ...props
}) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: Config.REACT_APP_GMAPS_API_KEY,
  });
  const [mapRef, setMapRef] = useState(null);
  const filteredMarkers = useMemo(() => markers.filter(m => !!m), [markers]);

  const setZoom = useCallback(
    (zoom = 16) => {
      mapRef?.setZoom(zoom);
    },
    [mapRef],
  );

  const centerInUserPosition = useCallback(async () => {
    try {
      const position = await getCurrentPosition();
      const {coords} = position;
      if (coords.latitude && coords.longitude) {
        mapRef?.panTo({lat: coords.latitude, lng: coords.longitude});
        setZoom(17, 5);
      }
    } catch (e) {}
  }, [mapRef, setZoom]);

  const fitBounds = useCallback(
    (map = null) => {
      if ('google' in window && filteredMarkers.length > minMarkerAnimation) {
        const bounds = new window.google.maps.LatLngBounds();
        filteredMarkers
          .filter(i => i.latitude && i.longitude)
          .forEach(marker => {
            bounds.extend({lat: marker.latitude, lng: marker.longitude});
          });
        (mapRef || map).fitBounds(
          bounds,
          filteredMarkers.length >= 2 && edgePadding,
        );
        if (filteredMarkers.length < 2) {
          setZoom();
        }
      }
    },
    [filteredMarkers, mapRef],
  );

  useEffect(() => {
    if (mapRef) {
      fitBounds(mapRef);
    }
  }, [mapRef, filteredMarkers]);

  const handleLoad = map => {
    setMapRef(map);
    fitBounds(map);
  };

  const renderMapMarker = useCallback(
    ({icon, iconSize, iconOptions, ...marker}, index) => {
      return (
        <Marker
          key={index.toString()}
          id={marker.id}
          name={marker.id}
          position={{
            lat: marker.latitude,
            lng: marker.longitude,
          }}
          icon={{
            url: icon ? icon : MAP_PIN,
            color: marker?.color || theme.primaryColor,
            tintColor: marker?.color || theme.primaryColor,
            scaledSize: iconSize
              ? iconSize
              : {
                  height: 30,
                  width: 30,
                },
            ...iconOptions,
          }}
        />
      );
    },
    [renderMarker],
  );

  const renderDirections = useCallback(() => {
    const dirList =
      directions
        ?.filter(i => !(i.latitude && i.longitude))
        .map(i => ({
          lat: i[0],
          lng: i[1],
        })) || [];

    return (
      directions &&
      directions.length > 0 && (
        <Polyline
          options={{
            strokeColor: theme.primaryLightColor,
            strokeWeight: scaleDp(4),
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 30000,
            zIndex: 1,
          }}
          path={dirList}
        />
      )
    );
  }, [directions]);

  useImperativeHandle(externalRef, () => ({
    setZoom,
    fitBounds,
  }));

  return (
    <Container style={props.style}>
      {isLoaded && !loadError ? (
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
            draggable: accesible,
            panControlOptions: accesible,
            rotateControlOptions: accesible,
            scaleControlOptions: accesible,
            zoomControlOptions: accesible,
            scrollWheel: accesible,
            zoomControl: accesible,
            disableDoubleClickZoom: accesible,
          }}
          center={INITIAL_POSITION}
          onLoad={handleLoad}>
          {filteredMarkers
            .filter(i => i.latitude && i.longitude)
            .map(renderMapMarker)}
          {renderDirections()}
        </GoogleMap>
      ) : (
        <AppText>Error {loadError}</AppText>
      )}
      {showsMyLocationButton && (
        <CurrentLoactionButton
          onPress={centerInUserPosition}
          icon="crosshairs-gps"
          iconColor={theme.fontColor}
          size={20}
        />
      )}
    </Container>
  );
};

Map.defaultProps = {
  minMarkerAnimation: 0,
  markers: [],
  renderMarker: null,
  edgePadding: null,
};
export default React.memo(
  React.forwardRef((props, ref) => <Map {...props} externalRef={ref} />),
);

// STYLES
const Container = styled.View`
  flex: 1;
`;

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
