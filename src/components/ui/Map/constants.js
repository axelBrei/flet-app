import {theme} from 'constants/theme';

export const INITIAL_POSITION = {lat: -34.582903, lng: -58.44214};
export const STYLES = {
  map: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    position: 'relative',
    width: '100%',
  },
};
export const ZOOM = {
  zoom: 13,
  maxZoom: 18,
};
export const POIS_STYLE = [
  {
    featureType: 'poi.attraction',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.government',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.school',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export const WEB_PIN = {
  path:
    'M29.55 15.22C29.55 7.2 23.13.7 15.15.54V.52l-.01.02c-.03 0-.07-.01-.1-.01l-.19-.01-.01.02C6.87.7.45 7.21.45 15.22c0 3.07.95 5.92 2.56 8.27v.01l11.96 18.97v-.15l.08.15L26.99 23.5v-.01c1.61-2.35 2.56-5.2 2.56-8.27zM15 20.71c-3.24 0-5.86-2.62-5.86-5.86S11.76 8.99 15 8.99s5.86 2.62 5.86 5.86-2.62 5.86-5.86 5.86z',
  strokeColor: theme.primaryColor,
  fillColor: theme.primaryColor,
  fillOpacity: 1,
  scale: 1,
};
