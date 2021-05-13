import React, {useCallback, useEffect} from 'react';
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
    ios: 0.7,
  }),
};
const getCroppingAreaSize = (height, width, aspectRatio) => {
  let cropperSize;

  if (aspectRatio < 1) {
    cropperSize = {
      width: Math.min(Math.min(width, height), 1280),
      height: Math.min(Math.max(width, height), 720),
    };
    cropperSize.width = cropperSize.height / Math.pow(aspectRatio, -1);
  } else {
    cropperSize = {
      width: Math.min(Math.max(width, height), 1280),
      height: Math.min(Math.min(width, height), 720),
    };
    cropperSize.height = cropperSize.width / aspectRatio;
  }
  return cropperSize;
};

const SelectImage = ({
  label,
  maxFiles,
  error,
  acceptTypes,
  value,
  onFocus,
  onSelectImage,
  externalRef,
  acceptFrontCamera = false,
  aspectRatio = 16 / 9,
  ...props
}) => {
  const processImage = useCallback(
    image => {
      const original = {
        name: image.filename || `${new Date().valueOf()}`,
        uri: image.path,
        type: image.mime,
      };
      onSelectImage({
        original,
        filename: original.name,
        ...image,
      });
    },
    [onSelectImage],
  );

  useEffect(() => ImagePicker.clean(), []);

  const cropImage = async original => {
    try {
      return await ImagePicker.openCropper({
        path: original.path,
        ...getCroppingAreaSize(original.height, original.width, aspectRatio),
        ...defaultProps,
      });
    } catch (e) {
      if (e.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(
          'Error',
          'Ocurrió un error al querer abrir el editor de la foto.',
        );
      }
    }
  };

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
      useFrontCamera: acceptFrontCamera,
      ...defaultProps,
    });
    const cropped = await cropImage(image);
    processImage(cropped);
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
      cropping: false,
      ...defaultProps,
    });
    const cropped = await cropImage(image);
    console.log(cropped, image);
    processImage(cropped);
  }, [onSelectImage, maxFiles]);

  const _onFocus = useCallback(e => {
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
      {cancelable: true},
    );
    return true;
  }, []);

  const onClear = useCallback(t => {
    if (t === '') {
      onSelectImage(null);
    }
  }, []);

  React.useImperativeHandle(externalRef, () => ({
    selectImage: () => {
      _onFocus();
    },
  }));

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

export default React.forwardRef((props, ref) => (
  <SelectImage externalRef={ref} {...props} />
));
