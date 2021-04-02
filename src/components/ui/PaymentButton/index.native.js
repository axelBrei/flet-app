import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {WebView} from 'react-native-webview';
import {AppText} from 'components/ui/AppText';
import {useModal} from 'components/Hooks/useModal';
import WebViewModal from 'components/MobileFullScreenModals/WebViewModal';
import {Platform} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';

export default () => {
  const {widthWithPadding} = useWindowDimension();
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width,shrink-to-fit=yes, initial-scale=1.0, maximum-scale=1.0"/>
        <style>
          body, html {
            display: flex;
            width: 100%;
            height: 40px;
            align-self: center;
            align-content: center;
            justify-content: center;
          }
          
          button.mercadopago-button {
            width: ${widthWithPadding}px;
            font-weight: bold;
            font-size: 16px;
            background-color: ${theme.primaryColor};
            color: #fff;
            border-radius: 20px;
          }
        </style>
      </head>
      <body>
        <form action='app://callback' method='get' id='form' nativeID='form'></form>
      </body>    
    </html>
`;

  const injectJs = `
      const form = document.getElementById('form');
      const script = document.createElement('script');
      // FROM
      form.setAttribute('action', 'app://callback');
      form.action = 'app://callback'
      form.setAttribute('method', 'get');
      // SCRIPT
      script.type = 'text/javascript';
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js';
      script.setAttribute(
        'data-public-key',
        'TEST-26dcc4a1-7a5b-4d63-9de5-e6d818994dfa',
      );
      script.setAttribute('data-transaction-amount', 1);
      form.action = 'app://callback'
      form.appendChild(script);
      form.action = 'app://callback'
      true; // note: this is required, or you'll sometimes get silent failures
`;
  const [open, setOpen] = useState(false);
  const [firstLoad, setFirstLoad] = useState(Platform.OS === 'ios');
  const onShouldStartLoadingWithRequest = useCallback(
    req => {
      console.log('on start load', req);
      if (
        !open &&
        req.url.includes('https://www.mercadopago.com.ar/checkout')
      ) {
        setOpen(true);
      }

      if (req.url.includes('app://callback')) {
        setOpen(false);
        console.log(req.url);
        // TODO parse data
        return false;
      }
      return true;
    },
    [open, setOpen, firstLoad],
  );

  const onLoadEnd = e => {
    // console.log('load end', e);
    firstLoad && setFirstLoad(false);
  };

  return (
    <WebView
      javaScriptEnabled
      domStorageEnabled
      contentMode="desktop" // asi anda
      source={{html}}
      originWhitelist={['*']}
      onLoadEnd={onLoadEnd}
      onMessage={() => {}}
      onShouldStartLoadWithRequest={onShouldStartLoadingWithRequest}
      injectedJavaScript={injectJs}
      containerStyle={[
        {height: 50, width: '100%', backgroundColor: 'gray'},
        open && {
          position: 'absolute',
          flex: 1,
          top: 30,
          left: 0,
          bottom: 60,
          right: 0,
          borderRadius: 20,
          zIndex: 200,
          height: 'auto',
          width: 'auto',
        },
      ]}
      onNavigationStateChange={state => console.log('state change', state)}
    />
  );
};

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 80px;
  background-color: blue;
  padding: 5px;
`;
