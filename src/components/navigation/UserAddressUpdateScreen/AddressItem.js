import React from 'react';
import styled, {css} from 'styled-components';
import {Row} from 'components/ui/Row';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {IconButton} from 'components/ui/IconButton';
import {capitallize} from 'helpers/stringHelper';
import {useSelector} from 'react-redux';
import {selectDeleteAddresLoadingIndex} from 'redux-store/slices/personalData/addressSlice';
import {Loader} from 'components/ui/Loader';

export const AddressItem = ({name, onPressDelete, ...props}) => {
  const loadingIndex = useSelector(selectDeleteAddresLoadingIndex);
  const loading = props.id === loadingIndex;

  return (
    <ItemContainer>
      <DataContainer>
        <Label numberOfLines={1}>{capitallize(name?.split(',')?.[0])}</Label>
        <Comment>
          {props?.comments}
          {props?.comments ? ' / ' : ''}
          {props?.type}
        </Comment>
      </DataContainer>
      <ButtonLoader loading={loading}>
        <IconButton
          icon="delete"
          iconColor={theme.error}
          borderColor={theme.error}
          inverted
          onPress={onPressDelete}
        />
      </ButtonLoader>
    </ItemContainer>
  );
};

const ItemContainer = styled(Row)`
  border-bottom-width: 0.5px;
  border-color: ${theme.lightGray};
  padding: 10px 0;
  max-width: ${({theme}) => theme.screenWidth}px;
  ${props =>
    !props.theme.isMobile &&
    css`
      max-width: 550px;
    `}
`;

const DataContainer = styled.View`
  flex-direction: column;
  flex: 1;
  margin-right: 10px;
`;

const Label = styled(AppText)`
  font-weight: bold;
  font-size: 18px;
  padding: 0;
`;
const Comment = styled(AppText)`
  font-size: 13px;
  color: ${theme.disabledFont};
`;
const ButtonLoader = styled(Loader)`
  align-items: flex-end;
  height: 40px;
  margin-right: 10px;
`;
