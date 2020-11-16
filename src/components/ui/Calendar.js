import React, {useCallback, useState, useMemo} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {LocaleConfig, Calendar as WixCalendar} from 'react-native-calendars';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import dayjs from 'dayjs';
import {formatDate, fromDate} from 'helpers/dateHelper';
import {AppText} from 'components/ui/AppText';

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
        <AppText
          fontSize={Platform.OS === 'web' ? 14 : 20}
          style={styles.yearOption}>
          {item}
        </AppText>
      </TouchableOpacity>
    ),
    [onYearPress],
  );

  return (
    <View style={styles.container}>
      {yearSelectionVisible ? (
        <View style={styles.yearSelection}>
          <FlatList
            data={yearsToShow}
            keyExtractor={(_, index) => index.toString()}
            initialScrollIndex={past || future ? 0 : 100}
            renderItem={renderYearItem}
          />
        </View>
      ) : (
        <WixCalendar
          onDayPress={onPressDay}
          current={dayToShow}
          markedDates={{
            [dayToShow]: {selected: true},
          }}
          renderHeader={renderHeader}
          renderArrow={renderArrows}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleDp(Platform.OS === 'web' ? 200 : 350),
    backgroundColor: theme.white,
  },
  yearSelection: {
    flex: 1,
    zIndex: 10,
    backgroundColor: theme.white,
  },
  yearOption: {
    paddingVertical: scaleDp(5),
    alignSelf: 'center',
  },
});
