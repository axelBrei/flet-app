import React, {useState} from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {WebView} from 'react-native-webview';
import {Loader} from 'components/ui/Loader';
import {Platform} from 'react-native';
import {theme} from 'constants/theme';

export default ({uri, closeModal}) => {
  const [firstLoad, setFirstLoad] = useState(Platform.OS === 'ios');
  const [loading, setLoading] = useState(true);

  const onShouldStartLoadWithRequest = request => {
    if (firstLoad) return true;
    console.log('alerta', request);
    return true;
  };

  const onLoadEnd = () => {
    setLoading(false);
    firstLoad && setFirstLoad(false);
  };

  return (
    <Container>
      <WebView
        limitsNavigationsToAppBoundDomains={false}
        sharedCookiesEnabled
        style={{flex: 1}}
        containerStyle={
          loading && {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }
        startInLoadingState
        originWhitelist={['*']}
        onLoadEnd={onLoadEnd}
        renderLoading={() => <Loader loading />}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        source={{uri}}
        onError={e => console.log('error', e)}
        onHttpError={() => console.log('httpError')}
        onMessage={() => console.log('message')}
        onNavigationStateChange={e => console.log('navigation state change', e)}
        onContentProcessDidTerminate={() =>
          console.log('content process terminate')
        }
        onRenderProcessGone={() => console.log('render process gone')}
      />

      <IconButton name="close" size={22} onPress={closeModal}>
        <Icon name="close" size={22} />
      </IconButton>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${theme.white};
  width: ${props =>
    Platform.select({
      web: () =>
        props.theme.isMobile ? `${props.theme.screenWidth}px` : '550px',
      native: () => '100%',
    })()};
  height: ${props =>
    Platform.select({
      native: '100%',
      web: (props.theme.isMobile ? props.theme.screenHeight - 104 : 550) + 'px',
    })};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const IconButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 20px;
`;
