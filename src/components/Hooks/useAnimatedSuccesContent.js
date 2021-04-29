import React from 'react';
import {theme as appTheme} from 'constants/theme';
import {OperationResult} from 'components/ui/OperationResult';

interface SuccessContentOptions {
  successConditions: Array;
  title: String;
  message: String;
  icon: String;
  theme: Object;
  isErrorContent: Boolean;
  onHideOperationResult: Function;
  buttonText: String;
}

export const useAnimatedOperationResult = ({
  successConditions = [],
  isErrorContent = false,
  title,
  message,
  icon,
  theme,
  buttonText,
  onHideOperationResult,
  ...props
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
          buttonText={buttonText}
          onHideOperationResult={onHideOperationResult}
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
        />
      ) : null,
  };
};
