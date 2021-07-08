import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {useSelector} from 'react-redux';
import {selectNewShipmentPrice} from 'redux-store/slices/newShipmentSlice';
import {Loader} from 'components/ui/Loader';

export default ({onPaymentSubmited, loading: newShipmetnLoading}) => {
  const [loading, setLoading] = useState(true);
  const price = useSelector(selectNewShipmentPrice);

  const html = `
    <html>
      <head>
        <meta name='viewport' content='width=device-width,shrink-to-fit=yes, initial-scale=1.0, maximum-scale=1.0'/>
        <link rel='preconnect' href='https://fonts.gstatic.com'>
        <link href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' rel='stylesheet'>
        <style>
          body {
            background-color: ${theme.backgroundColor};
          }
          h1, input, p, select, form {
            font-family: 'Poppins', sans-serif;
          }
          button {
            font-weight: bold;
            font-size: 16px;
            background-color: ${theme.primaryColor};
            color: #fff;
            border-radius: 20px;
            border: 0;
            padding: 10px 0;
          }
          form {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          h1 {
              margin: 0;
              padding: 0;
              font-weight: bold;
              margin-bottom: 5px;
              font-size: 20px;
          }
          input {
            border: none;
            border-radius: 20px;
            background-color: ${theme.grayBackground};
            padding: 15px 20px;
            margin: 5px 0;
            max-height: 40px;
            font-size: 14px;
          }
          select {
            border: none;
            border-radius: 20px;
            background-color: ${theme.grayBackground};
            padding: 10px 20px;
            font-size: 14px;
            margin: 10px 0;
            -webkit-appearance: none;
          }
          .row {
              flex-wrap: nowrap;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              flex-grow: 1;
          }
        </style>
      </head>
      <body>
        <form id='form-checkout'>
        <h1>Datos de la tarjeta</h1>
         <input type='number' name='cardNumber' id='form-checkout__cardNumber' />
         <div class='row'>
           <input style='width: 49%' type='number' name='cardExpirationMonth' id='form-checkout__cardExpirationMonth' />
           <input style='width: 49%' type='number' name='cardExpirationYear' id='form-checkout__cardExpirationYear' />
         </div>
         <input type='number' name='securityCode' id='form-checkout__securityCode' />
         <select name='issuer' id='form-checkout__issuer'></select>
         <h1 style='padding: 20px 0 0'>Datos de la personales</h1>
         <input type='text' name='cardholderName' id='form-checkout__cardholderName'/>
         <div class='row' >
           <select style='width: 48%' name='identificationType' id='form-checkout__identificationType'></select>
           <input style='width: 50%' type='number' name='identificationNumber' id='form-checkout__identificationNumber'/>
         </div>
         <select name='installments' id='form-checkout__installments'></select>
         <button type='submit' id='form-checkout__submit'>Pagar</button>
        </form>
        <script src="https://sdk.mercadopago.com/js/v2"></script>
        <script>
          const mp = new window.MercadoPago('${Config.REACT_APP_MP_KEY}')
          const cardForm = mp.cardForm({
            amount: "${price}",
            autoMount: true,
            form: {
              id: "form-checkout",
              cardholderName: {
                id: "form-checkout__cardholderName",
                placeholder: "Titular de la tarjeta",
              },
              cardNumber: {
                id: "form-checkout__cardNumber",
                placeholder: "Número de la tarjeta",
              },
              cardExpirationMonth: {
                id: "form-checkout__cardExpirationMonth",
                placeholder: "Mes de vencimiento",
              },
              cardExpirationYear: {
                id: "form-checkout__cardExpirationYear",
                placeholder: "Año de vencimiento",
              },
              securityCode: {
                id: "form-checkout__securityCode",
                placeholder: "Código de seguridad",
              },
              installments: {
                id: "form-checkout__installments",
                placeholder: "Cuotas",
              },
              identificationType: {
                id: "form-checkout__identificationType",
                placeholder: "Tipo de documento",
              },
              identificationNumber: {
                id: "form-checkout__identificationNumber",
                placeholder: "Número de documento",
              },
              issuer: {
                id: "form-checkout__issuer",
                placeholder: "Banco emisor",
              },
            },
            callbacks: {
              onFormMounted: error => {
                if (error) {
                  cardForm.unmount();
                  cardForm.mount();
                  return;
                }
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'loading',
                    value: false
                  }))
              },
              onSubmit: event => {
                event.preventDefault();
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'loading',
                  value: true
                }))
                const {
                  paymentMethodId,
                  issuerId,
                  token,
                  installments,
                  identificationNumber,
                  identificationType,
                } = cardForm.getCardFormData();
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'submit',
                  value:{
                    installments,
                    docNumber: identificationNumber,
                    docType: identificationType,
                    issuerId,
                    paymentMethodId,
                    token
                  }
                }))
              },
              onFetching: (res) => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'loading res',
                  value: res
                }))
              },
            },
          });    
        </script>
      </body>    
    </html>
`;

  const handleMessages = useCallback(
    e => {
      const data = JSON.parse(e?.nativeEvent?.data);
      if (data.type === 'loading') {
        return setLoading(data.value);
      }
      if (data.type === 'submit') {
        setLoading(false);
        return onPaymentSubmited?.(data.value);
      }
    },
    [setLoading, onPaymentSubmited],
  );

  return (
    <Container>
      <Loader
        unmount={false}
        loading={loading || newShipmetnLoading}
        size="large">
        <WebView
          javaScriptEnabled
          domStorageEnabled
          source={{html}}
          originWhitelist={['*']}
          onMessage={handleMessages}
          style={{flex: 1}}
        />
      </Loader>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 0 5px;
  background-color: ${theme.backgroundColor};
`;
