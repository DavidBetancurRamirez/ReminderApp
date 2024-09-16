import React from 'react'
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import Reminder from '@/src/components/Reminder';

const Reminders = () => {
  return (
    <ThemedView>
      <ThemedText type="title" style={{marginBottom:10}}>Reminders!</ThemedText>
      <Reminder reminderTitle="Fertilize" reminderDate="Today" reminderGroup="Crop" />
    </ThemedView> 
  )
}

export default Reminders;