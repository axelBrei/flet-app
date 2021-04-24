import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeMapDirectionsPreference,
  selectPreferenceMapProvider,
} from 'redux-store/slices/preferencesSlice';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {CustomImage} from 'components/ui/Image';
import {Column} from 'components/ui/Row';
import {theme} from 'constants/theme';
import {Platform} from 'react-native';

const mapOptions = [
  {
    title: 'Predeterminado',
    key: 'default',
    icon: Platform.select({
      ios: 'https://img.icons8.com/color/2x/apple-map.png',
      android: 'https://img.icons8.com/color/2x/google-maps.png',
      web: 'https://img.icons8.com/color/2x/google-maps.png',
    }),
  },
  {
    title: 'Waze',
    key: 'waze',
    icon: 'https://img.icons8.com/color/2x/waze.png',
  },
  ...(Platform.OS === 'ios'
    ? [
        {
          title: 'Google',
          key: 'google',
          icon: 'https://img.icons8.com/color/2x/google-maps.png',
        },
      ]
    : []),
];

export const MapPreferencesModalContent = ({closeModal}) => {
  const dispatch = useDispatch();
  const selectedPreference = useSelector(selectPreferenceMapProvider);

  const onPressSelectMap = useCallback(mapKey => {
    dispatch(changeMapDirectionsPreference(mapKey));
    closeModal();
  }, []);

  console.log(selectedPreference);
  return (
    <Container>
      <Title>Seleccioná la app de mapas</Title>
      <List
        keyExtractor={i => i.key}
        data={mapOptions}
        renderItem={({item}) => (
          <ButtonContainer
            onPress={() => onPressSelectMap(item.key)}
            selected={item.key === selectedPreference}>
            <Image
              resizeMode="contain"
              source={{uri: item.icon}}
              prefetch
              iconSize={22}
            />
            <MapName selected={item.key === selectedPreference}>
              {item.title}
            </MapName>
          </ButtonContainer>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  min-height: 100px;
  width: 100%;
  padding: 20px;
`;

const ButtonContainer = styled.TouchableOpacity`
  padding: 0 20px;
  flex-direction: row;
  height: 60px;
  align-items: center;
  background-color: ${({selected}) =>
    selected ? theme.primaryLightColor : theme.backgroundColor};
  margin: 5px 0;
  border-radius: 20px;
`;

const List = styled.FlatList`
  max-height: 450px;
`;

const Image = styled.Image`
  height: 100%;
  width: 30px;
  margin-right: 5px;
`;

const MapName = styled(AppText)`
  font-size: 14px;
  font-weight: 500;
  color: ${({selected}) => (selected ? theme.white : theme.fontColor)};
`;
