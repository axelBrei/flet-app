import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {Image as Img} from 'react-native';
import {theme} from 'constants/theme';
import {Loader} from 'components/ui/Loader';
import {Container} from 'components/ui/Container';
import {scaleDpTheme, scaleDp} from 'helpers/responsiveHelper';

export const CustomImage = ({
  source,
  defaultSource,
  defaultIcon,
  prefetch,
  classname,
  iconSize,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveImageInCache = useCallback(async () => {
    setLoading(true);
    try {
      const url = source?.uri;
      const cachedImages = await Img.queryCache([url]);
      if (!cachedImages[url]) {
        await Img.prefetch(url, () => setLoading(false));
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, [source]);

  useEffect(() => {
    source && prefetch && saveImageInCache();
  }, [source, prefetch, saveImageInCache]);

  const renderImage = useCallback(
    () =>
      (!source || error) && defaultIcon ? (
        <Icon name={defaultIcon} size={iconSize || 25} color={theme.disabled} />
      ) : (
        <Img
          source={source}
          defaultSource={defaultSource}
          style={{height: '100%', width: '100%'}}
          resizeMode={props.resizeMode}
        />
      ),
    [source, error, defaultIcon, defaultSource],
  );

  return (
    <ImageContainer classname={classname} {...props}>
      {loading ? <Loader loading={true} size="small" /> : renderImage()}
    </ImageContainer>
  );
};

CustomImage.defaultProps = {
  defaultSource: null,
  defaultIcon: null,
  prefetch: true,
  containerStyle: null,
};

const ImageContainer = styled(Container)`
  min-height: ${scaleDpTheme(45)};
  min-width: ${scaleDpTheme(45)};
  border-radius: ${scaleDpTheme(25)};
  background-color: ${theme.lightGray};
  margin: 0 ${scaleDpTheme(5)};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
