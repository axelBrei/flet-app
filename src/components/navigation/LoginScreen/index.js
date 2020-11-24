import React from 'react';
import {Screen} from 'components/ui/Screen';
import {Card} from 'components/ui/Card';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';

export const LoginScreen = () => {
  return (
    <Screen>
      <Card onlyWeb>
        <InputField />
        <InputField />
        <MainButton />
      </Card>
    </Screen>
  );
};

export default LoginScreen;
