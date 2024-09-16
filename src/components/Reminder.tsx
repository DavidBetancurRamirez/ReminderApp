import React from 'react'
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { StyleSheet, ScrollView } from 'react-native';
import Card from '@/src/components/Card';
import { Icon } from './Icon';

interface ReminderItemProps {
  reminderTitle: string;
  reminderDate: string;
  reminderGroup?: string;
}

const Reminder = ({ reminderTitle, reminderDate, reminderGroup }: ReminderItemProps) => {
  return (
    <Card>
      <Icon name="notifications" size={30} style={styles.icon} />

      <ThemedView background='card' style={styles.infoContainer}>
        <ThemedText style={styles.title}>{reminderTitle}</ThemedText>
        <ThemedText style={styles.info}>
            {reminderDate}
            {reminderGroup && 
                <ThemedText style={styles.info}> | {reminderGroup}</ThemedText>
            }
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