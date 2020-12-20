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
