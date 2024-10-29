import { useCallback, useMemo, useState } from 'react';
import Reminder from './Reminder';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { errorAlert } from '../utils/errorAlert.util';
import { useThemeColor } from '../hooks/useThemeColor';
import { ReminderAgendaType } from '../types/Reminder.type';
import useReminderStorage from '../hooks/useReminderStorage';
import { groupRemindersByDate } from '../utils/groupRemindersByDate.util';
import { ExpandableCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';

const Agenda = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [reminders, setReminders] = useState<ReminderAgendaType[]>([]);

  const { onGetReminders } = useReminderStorage();  

  const loadReminders = useCallback(async () => {
    try {
      const remindersResponse = await onGetReminders();
      const remindersGrouped = groupRemindersByDate(remindersResponse);
      setReminders(remindersGrouped);
    } catch (error) {
      setReminders([]);
      errorAlert(error)
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReminders().catch(null);
    }, [loadReminders])
  );

  // Colors
  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");
  const primaryColor = useThemeColor("primary");
  const card = useThemeColor("card");
  const styles = createStyles(backgroundColor, textColor);

  const calendarTheme = useMemo(() => ({
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
    indicatorColor: primaryColor,
  }), [card, primaryColor, textColor, backgroundColor]);

  const onDateChanged = useCallback((date: any) => {
    setSelectedDate(date);
  }, []);

  return (
    <CalendarProvider 
      date={selectedDate}
      onDateChanged={onDateChanged}
    >
      <ExpandableCalendar
        key={`${card}-${primaryColor}`}
        firstDay={1}
        markedDates={{ [selectedDate]: { selected: true } }}
        theme={calendarTheme}
      />
      <AgendaList
        sections={reminders}
        renderItem={({ item }) => (
          <Reminder 
            {...item}
          />
        )}
        sectionStyle={styles.section}
        keyExtractor={(item) => item.id}
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
