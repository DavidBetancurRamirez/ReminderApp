import React, { useCallback, useState } from 'react';
import { ExpandableCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';
import Reminder from './Reminder';
import { useThemeColor } from '../hooks/useThemeColor';
import ITEMS from '@/src/data/reminders'
import { StyleSheet } from 'react-native';

interface AgendaItem {
  name: string;
  hour: string;
  group?: string;
}

interface AgendaData {
  title: string;
  data: AgendaItem[];
}

interface PropsAgendaItem {
  item: AgendaItem;
  date: string;
}

const Agenda = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  // Colors
  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");
  const primaryColor = useThemeColor("primary");
  const card = useThemeColor("card");
  const styles = createStyles(backgroundColor, textColor);

  const onDateChanged = useCallback((date: any) => {
    setSelectedDate(date);
  }, []);

  const renderItem = useCallback(({item, date}: PropsAgendaItem) => (
    <Reminder name={item.name} date={date} hour={item.hour} />
  ), []);

  return (
    <CalendarProvider 
      date={selectedDate}
      onDateChanged={onDateChanged}
    >
      <ExpandableCalendar
        firstDay={1}
        markedDates={{ [selectedDate]: { selected: true } }}
        theme={{
          backgroundColor: card,
          calendarBackground: card,
          textSectionTitleColor: primaryColor,
          selectedDayBackgroundColor: primaryColor,
          selectedDayTextColor: textColor,
          todayTextColor: primaryColor,
          dayTextColor: textColor,
          textDisabledColor: backgroundColor,
          dotColor: primaryColor,
          selectedDotColor: textColor,
          arrowColor: primaryColor,
          monthTextColor: textColor,
          indicatorColor: primaryColor
        }}
      />
      <AgendaList
        sections={ITEMS}
        renderItem={({ item, section }) => renderItem({ item, date: section.title})}
        sectionStyle={styles.section}
        keyExtractor={(item, index) => item.name + index}
      />
    </CalendarProvider>
  );
};

const createStyles = (backgroundColor: string, textColor: string) =>
  StyleSheet.create({
    section: {
      backgroundColor,
      color: textColor,
    }
  });

export default Agenda;
