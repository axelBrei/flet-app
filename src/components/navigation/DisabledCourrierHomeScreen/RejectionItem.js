import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {
  getRejectionIcon,
  REJECTION_FIELDS_MAPPINGS,
} from 'constants/rejectedFieldsMappings';
import {Icon} from 'components/ui/Icon';
import {Row} from 'components/ui/Row';
import {RowWithBoldData} from 'components/ui/RowWithBoldData';
import {TouchableOpacity} from 'react-native';
import {theme} from 'constants/theme';
import dayjs from 'dayjs';
import {CustomImage} from 'components/ui/Image';

export const RejectionItem = ({item, onPress}) => {
  const {field, reason, createdAt} = item;

  const creationDate = dayjs(createdAt).format('DD/MM/YYYY - hh:mm');
  return (
    <TouchableOpacity onPress={onPress}>
      <BorderRow>
        <InformationContainer>
          <Image
            defaultIcon={getRejectionIcon(field)}
            iconSize={40}
            iconColor={theme.white}
          />
          <Container>
            <Title>{REJECTION_FIELDS_MAPPINGS[field]}</Title>
            <RowWithBoldData alternative={false} label="Motivo" data={reason} />
            <RowWithBoldData
              alternative={false}
              label="Fecha"
              data={creationDate}
            />
          </Container>
        </InformationContainer>
        <Icon name="chevron-right" size={30} />
      </BorderRow>
    </TouchableOpacity>
  );
};

const BorderRow = styled(Row)`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.lightGray};
`;

const InformationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  margin: 5px 0;
  padding: 5px 0;
`;

const Title = styled(AppText)`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Image = styled(CustomImage)`
  height: 65px;
  width: 65px;
  border-radius: 40px;
  margin-right: 10px;
  background-color: ${theme.primaryDarkColor};
`;
