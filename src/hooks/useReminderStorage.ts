import uuid from 'react-native-uuid';
import { ReminderProps, ReminderType } from '../types/Reminder.type';
import { getEnvKey, saveItem, getItems, removeItem } from '../utils/storage.util';

const keyName = "EXPO_PUBLIC_MY_REMINDER_KEY";

const useReminderStorage = () => {
  const onGetReminders = async (): Promise<ReminderType[] | []> => {
    const key = getEnvKey(keyName);
    return await getItems(key);
  };

  const onSaveReminder = async (reminder: ReminderProps): Promise<void> => {
    validateReminderProps(reminder);
    
    const key = getEnvKey(keyName);
    const id = uuid.v4();

    await saveItem(key, { ...reminder, id });
  };

  const onRemoveReminder = async (id: string): Promise<void> => {
    const key = getEnvKey(keyName);
    await removeItem<ReminderType>(key, (item) => item.id === id)
  }

  const validateReminderProps = (reminder: ReminderProps) => {
    // Name required
    if (reminder.name.trim().length === 0) {
      throw new Error("Name is empty");
    }
  }

  const deleteReminders = async () => {
    const key = getEnvKey(keyName);
    await removeItem<ReminderType>(key, () => true)
  }

  return {
    onGetReminders,
    onSaveReminder,
    onRemoveReminder,
    validateReminderProps,
    deleteReminders
  }
};

export default useReminderStorage;