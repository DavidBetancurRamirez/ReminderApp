import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReminderType } from '../types/Reminder.type';

const useReminderStorage = () => {
  const getKey = () => {
    const key = process.env.MY_REMINDER_KEY;

    if (key === null) {
      throw new Error("INTERNAL SERVER ERROR");
    }

    return key as string;
  };

  const getInfoFromStorage = async (storageKey: string) => {
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

  const saveInfoToStorage = async (storageKey: string, reminder: ReminderType) => {
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

  const handleGetReminders = async () => {
    try {
      const key = getKey();

      return await getInfoFromStorage(key);
    } catch (error) {
      return Promise.reject(error);      
    }
  };

  const handleSaveReminder = async (reminder: ReminderType) => {
    try {
      const key = getKey();

      return await saveInfoToStorage(key, reminder);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveReminder = async (id: string) => {
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
}

export default useReminderStorage;