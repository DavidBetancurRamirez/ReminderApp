import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import ReminderItem from '@/src/components/RemindersItem';

const Reminders = () => {
  return (
    <ThemedView style={styles.titleContainer}>
       <ScrollView>
            <ReminderItem reminderTitle="Fertilize" reminderDate="Today" reminderGroup="Crop" />
            <ReminderItem reminderTitle="Fertilize" reminderDate="Today" />
            <ReminderItem reminderTitle="Fertilize" reminderDate="Today" />
            <ReminderItem reminderTitle="Fertilize" reminderDate="Today" />
            <ReminderItem reminderTitle="Fertilize" reminderDate="Today" />
            <ReminderItem reminderTitle="Fertilize" reminderDate="Today" />
        </ScrollView>
        <ThemedText type="title">Reminders!</ThemedText>
    </ThemedView> 
  )
}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });

export default Reminders;