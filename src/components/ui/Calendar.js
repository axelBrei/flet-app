import React, {useCallback, useState, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {LocaleConfig, Calendar as WixCalendar} from 'react-native-calendars';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import dayjs from 'dayjs';
import {formatDate, fromDate} from 'helpers/dateHelper';

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

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
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
      console.log(day);
      setSelectedDate(fromDate(day.dateString));
    },
    [setSelectedDate],
  );
  const dayToShow = useMemo(() => formatDate(selectedDate), [selectedDate]);

  return (
    <View style={styles.container}>
      <WixCalendar
        onDayPress={onPressDay}
        style={styles.calendar}
        current={formatDate(dayjs())}
        markedDates={{
          [dayToShow]: {selected: true},
        }}
        renderArrow={renderArrows}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleDp(400),
    backgroundColor: theme.white,
  },
  calendar: {
    width: 420,
  },
});
