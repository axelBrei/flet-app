import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeMapDirectionsPreference,
  selectPreferenceMapProvider,
  selectPreferenceMapUrls,
} from 'redux-store/slices/preferencesSlice';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {CustomImage} from 'components/ui/Image';
import {Column} from 'components/ui/Row';
import {theme} from 'constants/theme';
import {Platform, Linking} from 'react-native';

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
          testUrl: 'comgooglemaps://?center={{latitude}},{{longitude}}',
          icon: 'https://img.icons8.com/color/2x/google-maps.png',
        },
      ]
    : []),
];

const getUrl = url =>
  url.replace(
    '{{latitude}},{{longitude}}',
    '-34.59784330312339,-58.424820872669194',
  );

export const MapPreferencesModalContent = ({closeModal}) => {
  const dispatch = useDispatch();
  const mapsUrls = useSelector(selectPreferenceMapUrls);
  const selectedPreference = useSelector(selectPreferenceMapProvider);
  const [list, setList] = useState([]);

  const poblateList = useCallback(async () => {
    const canOpenUrls = await Promise.all(
      mapOptions.map(async item => {
        const url = getUrl(item.testUrl || mapsUrls[item.key]);
        try {
          return await Linking.canOpenURL(url);
        } catch (e) {
          return Promise.resolve();
        }
      }),
    );
    setList(mapOptions.filter((_, index) => canOpenUrls[index]));
  }, [mapsUrls]);

  useEffect(() => {
    poblateList();
  }, [poblateList]);

  const onPressSelectMap = useCallback(mapKey => {
    dispatch(changeMapDirectionsPreference(mapKey));
    closeModal();
  }, []);

  return (
    <Container>
      <Title>Seleccioná la app de mapas</Title>
      <List
        keyExtractor={i => i.key}
        data={list}
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
