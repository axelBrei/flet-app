import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import PermissionManager from 'components/Permissions/index';
import InputField from 'components/ui/InputField';

const SelectImage = ({
  label,
  maxFiles,
  error,
  acceptTypes,
  value,
  onSelectImage,
  onFocus,
  externalRef,
  ...props
}) => {
  const inputRef = React.useRef(null);

  useEffect(() => {
    try {
      PermissionManager.checkPermissions([PermissionManager.camera]);
    } catch (e) {}
  }, []);

  const fileOnChange = useCallback(
    event => {
      const image = event.target.files[0];
      onSelectImage({
        original: image,
        filename: image.name,
        size: image.size,
        mime: image.type,
        modificationDate: image.lastModified,
        path: URL.createObjectURL(event.target.files[0]),
      });
    },
    [onSelectImage],
  );

  const cleanImage = useCallback(
    t => {
      t === '' && onSelectImage(null);
    },
    [onSelectImage],
  );

  const _onFocus = useCallback(
    e => {
      inputRef.current?.click();
      return true;
    },
    [inputRef],
  );

  React.useImperativeHandle(externalRef, () => ({
    selectImage: _onFocus,
  }));

  return (
    <>
      <InputField
        label={label}
        value={value?.filename}
        renderAccesory={() => (
          <Icon name={'cloud-upload'} color={theme.disabledFont} size={25} />
        )}
        clearable
        onChangeText={cleanImage}
        onFocus={_onFocus}
        error={error}
        {...props}
      />
      <input
        ref={inputRef}
        id="file-uploader"
        name="file-uploader"
        type="file"
        style={{
          opacity: 0.01,
          height: 1,
          width: 1,
          pointerEvents: 'none',
        }}
        onChange={fileOnChange}
        accept={acceptTypes}
        capture="user"
      />
    </>
  );
};

SelectImage.defaultProps = {
  acceptTypes: 'image/*',
  maxFiles: 1,
};
SelectImage.propTypes = {
  acceptTypes: PropTypes.string,
  maxFiles: PropTypes.number,
};

export default React.forwardRef((props, ref) => (
  <SelectImage externalRef={ref} {...props} />
));
