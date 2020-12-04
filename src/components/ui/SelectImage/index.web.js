import React, {useCallback, useEffect} from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {MainButton} from 'components/ui/MainButton';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Container} from 'components/ui/Container';
import {theme} from 'constants/theme';
import PermissionManager from 'components/Permissions/index';

const SelectImage = ({label, maxFiles, acceptTypes, value, onSelectImage}) => {
  const inputRef = React.useRef(null);

  useEffect(() => {
    PermissionManager.checkPermissions(PermissionManager.camera);
  }, []);

  const fileOnChange = useCallback(
    (event) => {
      const image = event.target.files[0];
      console.log(image);
      onSelectImage({
        ...image,
        name: image.name,
        size: image.size,
        mime: image.type,
        modificationDate: image.lastModified,
        path: URL.createObjectURL(event.target.files[0]),
      });
    },
    [onSelectImage],
  );

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
      <Container dir="column" alignItems="center">
        <AppText bold width="100%">
          {label}
        </AppText>
        <input
          ref={inputRef}
          id="file-uploader"
          name="file-uploader"
          type="file"
          style={{
            opacity: 0,
            height: 1,
            width: 1,
            pointerEvents: 'none',
            position: 'absolute',
          }}
          onChange={fileOnChange}
          accept={acceptTypes}
          capture="user"
        />
        {value ? (
          <CancelButton onPress={cleanImage} alternative label="Borrar foto" />
        ) : (
          <Button
            onPress={() => inputRef.current?.click()}
            htmlFor="file-uploader"
            label="subir foto"
            inverted
          />
        )}
      </Container>
    </ComponentContainer>
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
export default SelectImage;

const ComponentContainer = styled(Container)`
  margin-top: ${scaleDpTheme(5)};
  margin-bottom: ${scaleDpTheme(15)};
`;

const Button = styled(MainButton)`
  height: ${scaleDpTheme(20)};
  width: 50%;
  margin-left: 0;
`;

const SelectedImage = styled(Image)`
  height: 135%;
  width: 135%;
`;

const CancelButton = styled(MainButton)`
  height: ${scaleDpTheme(20)};
  width: 50%;
`;

const RoundedIconContainer = styled(View)`
  align-items: center;
  justify-content: center;
  border-color: ${theme.accentColor};
  height: ${scaleDpTheme(48)};
  width: ${scaleDpTheme(48)};
  border-width: 2px;
  border-radius: 50%;
  padding: ${scaleDpTheme(5)};
  margin-right: ${scaleDpTheme(3)};
  overflow: hidden;
`;
