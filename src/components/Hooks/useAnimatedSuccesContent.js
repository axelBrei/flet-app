import React, {useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Animated} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {theme as appTheme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {OperationResult} from 'components/ui/OperationResult';

interface SuccessContentOptions {
  successConditions: Array;
  title: String;
  message: String;
  icon: String;
  theme: Object;
  isErrorContent: Boolean;
}

export const useAnimatedOperationResult = ({
  successConditions = [],
  isErrorContent = false,
  title,
  message,
  icon,
  theme,
}: SuccessContentOptions) => {
  const isSuccesful =
    successConditions.length > 0 && successConditions.every(i => !!i);
  return {
    isSuccesful,
    OperationResultContent: () =>
      isSuccesful ? (
        <OperationResult
          title={title}
          message={message}
          icon={
            isErrorContent
              ? 'close-circle-outline'
              : icon || 'check-circle-outline'
          }
          theme={{
            iconColor: isErrorContent ? appTheme.error : appTheme.online,
            backgroundColor: theme?.backgroundColor || appTheme.white,
            ...theme,
          }}
          visible
          onHideOperationResult={() => {}}
        />
      ) : null,
  };
};
