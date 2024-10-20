import uuid from 'react-native-uuid';
import { ReminderProps, ReminderType } from '../types/Reminder.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useReminderStorage = () => {
  const getKey = (): string => {
    const key = process.env.EXPO_PUBLIC_MY_REMINDER_KEY;

    if (key === null) {
      throw new Error("INTERNAL SERVER ERROR");
    }

    return key as string;
  };

  const getInfoFromStorage = async (storageKey: string): Promise<ReminderType[]> => {
    try {
      const reminders = await AsyncStorage.getItem(storageKey);

      if (reminders !== null) {
        const parsedReminders = JSON.parse(reminders);
        return Promise.resolve(parsedReminders);
      }

      return []; 
    } catch (error) {
      return Promise.reject(error);      
    }
  }

  const saveInfoToStorage = async (storageKey: string, reminder: ReminderType): Promise<void> => {
    try {
      const currentSavedReminders = await AsyncStorage.getItem(storageKey);
      let remindersToSave = [];

      if (currentSavedReminders !== null) {
        remindersToSave = JSON.parse(currentSavedReminders);
      }

      remindersToSave.push(reminder);

      await AsyncStorage.setItem(
        storageKey, 
        JSON.stringify(remindersToSave)
      );

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetReminders = async (): Promise<ReminderType[]> => {
    try {
      const key = getKey();

      return await getInfoFromStorage(key);
    } catch (error) {
      return Promise.reject(error);      
    }
  };

  const handleSaveReminder = async (reminder: ReminderProps): Promise<void> => {
    try {
      const key = getKey();
      const id = uuid.v4();

      return await saveInfoToStorage(
        key, 
        {
          ...reminder,
          id
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveReminder = async (id: string): Promise<void> => {
    try {
      const key = getKey();
      const reminders = await handleGetReminders();

      const filteredItem = reminders?.filter((item: ReminderType) => {
        return item.id != id;
      })

      await AsyncStorage.setItem(
        key,
        JSON.stringify(filteredItem),
      )

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error);      
    }
  }

  return {
    onGetReminders: handleGetReminders,
    onSaveReminder: handleSaveReminder,
    onRemoveReminder: handleRemoveReminder,
  }
};

export default useReminderStorage;