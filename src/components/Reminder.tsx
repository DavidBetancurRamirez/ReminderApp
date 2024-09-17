import React from 'react'
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { StyleSheet } from 'react-native';
import Card from '@/src/components/Card';
import { Icon } from './Icon';

interface ReminderProps {
  name: string;
  date: string;
  hour: string;
  group?: string;
}

const Reminder = ({ name, date, hour, group }: ReminderProps) => {
  return (
    <Card>
      <Icon name="notifications" size={30} style={styles.icon} />

      <ThemedView background='card' style={styles.infoContainer}>
        <ThemedText style={styles.title}>{name}</ThemedText>
        <ThemedText style={styles.info}>
            {formatDate(date)} | {hour}
        </ThemedText>
      </ThemedView>

      <Icon name="chevron-forward-outline" size={30} style={styles.icon} />
    </Card>
  )
}

const formatDate = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);

  // Ajustar la hora a medianoche para comparar solo fechas
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === -1) return 'Today';
  else if (diffDays === -2) return 'Yesterday';
  else if (diffDays === 0) return 'Tomorrow';
  else return dateString;
};

const styles = StyleSheet.create({
    icon: {
      margin: 10,
    },
    infoContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    info: {
      fontWeight: '100',
    },
  });

export default Reminder;
