import React from 'react'
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import Calendar from '@/src/components/Calendar';

const Reminders = () => {

  return (
    // <ThemedView>
    //  <ThemedText>Header</ThemedText> 
      <Calendar />
    //  <ThemedText>Algo abajo</ThemedText> 
    // </ThemedView>
  );
}

export default Reminders;