import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {CustomImage} from 'components/ui/Image';
import {Platform, TouchableOpacity} from 'react-native';
import {useUserData} from 'components/Hooks/useUserData';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import SelectImage from 'components/ui/SelectImage';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchChangeProfilePicture,
  selectIsLoadingUpdateProfilePicture,
  selectUpdateProfilePictureError,
} from 'redux-store/slices/personalData/personalData';
import {Loader} from 'components/ui/Loader';
import {OperationResult} from 'components/ui/OperationResult';

export const UserHeader = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const {name, lastName, email, picture} = useUserData();
  const isLoading = useSelector(selectIsLoadingUpdateProfilePicture);
  const error = useSelector(selectUpdateProfilePictureError);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const onImageChange = useCallback(image => {
    setIsImageChanged(true);
    dispatch(fetchChangeProfilePicture(image));
  }, []);

  const onPressChageImage = useCallback(() => {
    inputRef.current?.selectImage?.();
  }, [inputRef]);

  return (
    <Container>
      <ImageButton onPress={onPressChageImage} disabled={isLoading}>
        <Loader loading={isLoading}>
          <OperationResult
            icon={error && 'close'}
            visible={isImageChanged && !isLoading}
            theme={{
              iconSize: 32,
              iconColor: error && theme.error,
            }}
            onHideOperationResult={() => setIsImageChanged(false)}>
            <InvisibleInput
              ref={inputRef}
              onSelectImage={onImageChange}
              autoFocus={false}
            />
            <Image
              defaultIcon="account"
              iconSize={60}
              source={picture}
              prefetch
              resizeMode="contain"
            />
          </OperationResult>
        </Loader>
      </ImageButton>

      <Title color={theme.white}>
        {name} {lastName}
      </Title>
      <AppText color={theme.white}>{email}</AppText>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  align-items: center;
  background-color: ${theme.primaryColor};
  padding: 20px;
  ${props =>
    Platform.OS === 'web' &&
    !props.theme.isMobile &&
    css`
      border-radius: 20px;
      margin: 10px;
      max-width: 414px;
      margin-top: 45px;
      margin-bottom: 20px;
    `}
`;

const Image = styled(CustomImage)`
  height: 130px;
  width: 130px;
  border-radius: 75px;
  margin: 0;
`;

const ImageButton = styled.TouchableOpacity`
  height: 130px;
  width: 130px;
  border-radius: 75px;
  margin: 10px 0 20px;
  background-color: ${theme.lightGray};
`;

const InvisibleInput = styled(SelectImage)`
  height: 1px;
  width: 1px;
  left: 60px;
  top: 60px;
  position: absolute;
`;
