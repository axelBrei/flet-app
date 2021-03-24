import React, {useCallback, useState, useMemo} from 'react';
import styled, {css} from 'styled-components';
import {Platform, View, TouchableOpacity} from 'react-native';
import {LocaleConfig, Calendar as WixCalendar} from 'react-native-calendars';
import {scaleDp} from 'helpers/responsiveHelper';
import {Icon} from 'components/ui/Icon';
import dayjs from 'dayjs';
import {formatDate, fromDate} from 'helpers/dateHelper';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul.',
    'Ago',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mir.', 'Jue.', 'Vie.', 'Sab.'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

export const Calendar = ({currentDate, onDayPress, future, past}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate || dayjs());
  const [yearSelectionVisible, setYearSelectionVisible] = useState(false);

  const renderArrows = useCallback(
    (direction) => (
      <Icon
        size={scaleDp(Platform.OS === 'web' ? 15 : 20)}
        name={`chevron-${direction}`}
      />
    ),
    [],
  );

  const onPressDay = useCallback(
    (day) => {
      const date = fromDate(day.dateString);
      setSelectedDate(date);
      onDayPress(date);
    },
    [setSelectedDate, onDayPress],
  );

  const renderHeader = useCallback(
    (date) => {
      const day = dayjs(date);
      return (
        <View>
          <AppText onPress={() => setYearSelectionVisible(true)}>
            {formatDate(day, 'MMMM YYYY')}
          </AppText>
        </View>
      );
    },
    [setYearSelectionVisible],
  );

  const dayToShow = useMemo(() => formatDate(selectedDate), [selectedDate]);

  const yearsToShow = useMemo(() => {
    const currentYear = dayjs().year();
    if (past) {
      return new Array(100).fill(2).map((item, index) => currentYear - index);
    }
    if (future) {
      return new Array(100).fill(2).map((item, index) => currentYear + index);
    }
    return new Array(200)
      .fill(2)
      .map((item, index) => currentYear - 200 + index);
  }, [past, future]);

  const onYearPress = useCallback(
    (item) => () => {
      setSelectedDate(selectedDate.year(item));
      setYearSelectionVisible(false);
    },
    [setSelectedDate, setYearSelectionVisible, selectedDate],
  );

  const renderYearItem = useCallback(
    ({item}) => (
      <TouchableOpacity onPress={onYearPress(item)} key={item.toString()}>
        <YearText>{item}</YearText>
      </TouchableOpacity>
    ),
    [onYearPress],
  );

  return (
    <Container>
      {yearSelectionVisible ? (
        <YearListContainer
          data={yearsToShow.reverse()}
          keyExtractor={(_, index) => index.toString()}
          initialScrollIndex={past || future ? 0 : 100}
          renderItem={renderYearItem}
        />
      ) : (
        <StyledCalendar
          onDayPress={onPressDay}
          current={dayToShow}
          markedDates={{
            [dayToShow]: {selected: true},
          }}
          renderHeader={renderHeader}
          renderArrow={renderArrows}
          theme={{
            selectedDayBackgroundColor: theme.primaryLightColor,
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const StyledCalendar = styled(WixCalendar)`
  width: 100%;

  ${({theme}) =>
    Platform.OS === 'web' &&
    !theme.isMobile &&
    css`
      width: 40%;
      min-width: 350px;
    `};
`;

const YearListContainer = styled.FlatList`
  height: 300px;
`;

const YearText = styled(AppText)`
  padding: 10px 0;
  align-items: center;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;
