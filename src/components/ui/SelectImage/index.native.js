import React, {useCallback} from 'react';
import {View, Platform, Image} from 'react-native';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {MainButton} from 'components/ui/MainButton';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {IconButton} from 'components/ui/IconButton';
import {AppText} from 'components/ui/AppText';
import ImagePicker from 'react-native-image-crop-picker';
import PermissionManager from 'components/Permissions/index';

const defaultProps = {
  cropperToolbarTitle: 'Editá la foto',
  loadingLabelText: 'Procesando imagenes...',
  cropperChooseText: 'Seleccionar',
  cropperCancelText: 'Cancelar',
  compressImageQuality: Platform.select({
    android: 0.6,
    ios: 0.8,
  }),
};

const SelectImage = ({
  label,
  maxFiles,
  acceptTypes,
  value,
  onSelectImage,
  ...props
}) => {
  const onPressCamera = useCallback(async () => {
    if (
      !(await PermissionManager.checkPermissions([
        PermissionManager.PERMISSIONS.camera,
      ]))
    ) {
      return;
    }
    const image = await ImagePicker.openCamera({
      multiple: maxFiles > 1,
      mediaType: 'photo',
      cropping: true,
      ...defaultProps,
    });
    onSelectImage(image);
  }, [onSelectImage, maxFiles]);

  const onPressGalery = useCallback(async () => {
    if (
      !(await PermissionManager.checkPermissions([
        PermissionManager.PERMISSIONS.photo,
      ]))
    ) {
      return;
    }
    const image = await ImagePicker.openPicker({
      multiple: maxFiles > 1,
      mediaType: 'photo',
      cropping: true,
      ...defaultProps,
    });
    onSelectImage(image);
  }, [onSelectImage, maxFiles]);

  const cleanImage = useCallback(() => {
    onSelectImage(null);
  }, [onSelectImage]);

  return (
    <ComponentContainer dir="row">
      <RoundedIconContainer>
        {value ? (
          <SelectedImage source={{uri: value.path}} />
        ) : (
          <Icon name="account" size={scaleDp(35)} color={theme.accentColor} />
        )}
      </RoundedIconContainer>
      <Container>
        <AppText fontSize={18}>{label}</AppText>
        {value ? (
          <CancelButton onPress={cleanImage} inverted label="Borrar foto" />
        ) : (
          <Container dir="row" width="80%" justifyContent="center">
            <OptionButton
              alternative
              icon="image-outline"
              size={25}
              onPress={onPressGalery}
            />
            <OptionButton
              inverted
              icon="camera-outline"
              size={25}
              onPress={onPressCamera}
            />
          </Container>
        )}
      </Container>
    </ComponentContainer>
  );
};

SelectImage.defaultProps = {
  maxFiles: 1,
};

export default SelectImage;
const ComponentContainer = styled(Container)`
  margin-top: ${scaleDpTheme(5)};
  margin-bottom: ${scaleDpTheme(25)};
  align-items: center;
  justify-content: center;
`;

const SelectedImage = styled(Image)`
  height: 135%;
  width: 135%;
`;

const CancelButton = styled(MainButton)`
  height: ${scaleDpTheme(30)};
  width: 100%;
`;

const RoundedIconContainer = styled(View)`
  align-items: center;
  justify-content: center;
  border-color: ${theme.accentColor};
  height: ${scaleDpTheme(60)};
  width: ${scaleDpTheme(60)};
  border-width: 2px;
  border-radius: ${scaleDpTheme(30)};
  padding: ${scaleDpTheme(5)};
  margin-right: ${scaleDpTheme(3)};
  overflow: hidden;
`;

const OptionButton = styled(IconButton)`
  margin-top: ${scaleDpTheme(3)};
  margin-left: ${scaleDpTheme(15)};
  margin-right: ${scaleDpTheme(15)};
`;
