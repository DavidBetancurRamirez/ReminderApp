import uuid from 'react-native-uuid';
import { ReminderProps, ReminderType } from '../types/Reminder.type';
import { getEnvKey, saveItem, getItems, removeItem } from '../utils/storage.util';

const keyName = "EXPO_PUBLIC_MY_REMINDER_KEY";

const useReminderStorage = () => {
  const onGetReminders = async (): Promise<ReminderType[] | []> => {
    try {
      const key = getEnvKey(keyName);
      return await getItems(key);
    } catch (error) {
      return Promise.reject(error);      
    }
  };

  const onSaveReminder = async (reminder: ReminderProps): Promise<void> => {
    try {
      const key = getEnvKey(keyName);
      const id = uuid.v4();

      return await saveItem(key, { ...reminder, id });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onRemoveReminder = async (id: string): Promise<void> => {
    try {
      const key = getEnvKey(keyName);
      await removeItem<ReminderType>(key, (item) => item.id === id)
    } catch (error) {
      return Promise.reject(error);      
    }
  }

  return {
    onGetReminders,
    onSaveReminder,
    onRemoveReminder,
  }
};

export default useReminderStorage;