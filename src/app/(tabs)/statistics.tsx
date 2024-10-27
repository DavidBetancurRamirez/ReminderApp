import { StyleSheet } from 'react-native';

import { ThemedText } from '../../components/Theme/ThemedText';
import { ThemedView } from '../../components/Theme/ThemedView';
import { ReminderType } from '@/src/types/Reminder.type';
import { useCallback, useState } from 'react';
import useReminderStorage from '@/src/hooks/useReminderStorage';
import { errorAlert } from '@/src/utils/errorAlert.util';
import { useFocusEffect } from 'expo-router';

const Statistics = () => {
  const [reminders, setReminders] = useState<ReminderType[]>([]);

  const { onGetReminders } = useReminderStorage();

  const loadGroups = useCallback(async () => {
    try {
      const groupsResponse = await onGetReminders();
      setReminders(groupsResponse);
      console.log(reminders)
    } catch (error) {
      setReminders([]);
      errorAlert(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGroups()
    }, [loadGroups])
  );

  return (
    <ThemedView style={styles.titleContainer} background='card'>
      <ThemedText type="title" textColor='notification'>Statistics!</ThemedText>
    </ThemedView> 
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default Statistics;