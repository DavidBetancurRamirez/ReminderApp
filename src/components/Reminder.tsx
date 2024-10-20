import React from 'react'
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { StyleSheet } from 'react-native';
import Card from '@/src/components/Card';
import { Icon } from './Icon';
import { dateName } from '../utils/date.util';
import { ReminderProps } from '../types/Reminder.type';

const Reminder = (reminder: ReminderProps) => {
  return (
    <Card>
      <Icon name="notifications" size={30} />

      <ThemedView background='card' style={styles.infoContainer}>
        
        <ThemedText style={styles.title}>{reminder.name}</ThemedText>

        <ThemedText style={styles.group}>
          {dateName(reminder.date)}
          {reminder.group && " | " + reminder.group}
        </ThemedText>

        <ThemedText style={styles.info}>
          {reminder.allDay 
            ? "All Day" 
            : reminder.startTime + " - " + reminder.endTime
          }
        </ThemedText>

      </ThemedView>

      <Icon name="chevron-forward-outline" size={30} />
    </Card>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  group: {
    fontWeight: "300",
  },
  info: {
    fontWeight: '100',
  },
});

export default Reminder;
