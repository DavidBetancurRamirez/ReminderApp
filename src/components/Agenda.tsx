import React, { useCallback, useState } from 'react';
import { ExpandableCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';
import Reminder from './Reminder';
import { useThemeColor } from '../hooks/useThemeColor';
import { StyleSheet } from 'react-native';
import useReminderStorage from '../hooks/useReminderStorage';
import { ReminderAgendaType, ReminderType } from '../types/Reminder.type';
import { useFocusEffect } from 'expo-router';
import { groupRemindersByDate } from '../utils/groupRemindersByDate.util';

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
      console.error(error);
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

  const onDateChanged = useCallback((date: any) => {
    setSelectedDate(date);
  }, []);

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
        sections={reminders}
        renderItem={({ item, section }) => (
          <Reminder 
            {...item}
            date={section.title}
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
