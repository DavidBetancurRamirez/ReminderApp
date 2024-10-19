import React from 'react'
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { StyleSheet } from 'react-native';
import Card from '@/src/components/Card';
import { Icon } from './Icon';
import { dateName } from '../utils/date.utils';

export interface ReminderProps {
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
            {dateName(date)} | {hour}
        </ThemedText>
      </ThemedView>

      <Icon name="chevron-forward-outline" size={30} style={styles.icon} />
    </Card>
  )
}

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
