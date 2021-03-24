import React, {useCallback} from 'react';
import {Platform, Alert} from 'react-native';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import ImagePicker from 'react-native-image-crop-picker';
import PermissionManager from 'components/Permissions/index';
import InputField from 'components/ui/InputField';

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
  error,
  acceptTypes,
  value,
  onFocus,
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

  const _onFocus = useCallback((e) => {
    Alert.alert(
      'Elegí una fuente',
      'Elegi de donde querés selccionar la foto',
      [
        {
          text: 'Cámara',
          onPress: onPressCamera,
        },
        {
          text: 'Galería',
          onPress: onPressGalery,
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
    return true;
  }, []);

  const onClear = useCallback((t) => {
    if (t === '') {
      onSelectImage(null);
    }
  }, []);

  return (
    <InputField
      label={label}
      value={value?.filename}
      renderAccesory={() => (
        <Icon name={'cloud-upload'} color={theme.disabledFont} size={25} />
      )}
      clearable
      onChangeText={onClear}
      onFocus={_onFocus}
      error={error}
      {...props}
    />
  );
};

SelectImage.defaultProps = {
  maxFiles: 1,
};

export default SelectImage;
