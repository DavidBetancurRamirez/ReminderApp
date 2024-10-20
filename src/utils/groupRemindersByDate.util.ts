import { ReminderAgendaType, ReminderType } from "../types/Reminder.type";

export const groupRemindersByDate = (reminders: ReminderType[]): ReminderAgendaType[] => {
  const groupedReminders: Record<string, ReminderType[]> = {};

  reminders.forEach((reminder) => {
    const dateKey = reminder.date;
    
    if (!groupedReminders[dateKey]) {
      groupedReminders[dateKey] = [];
    }
    
    groupedReminders[dateKey].push(reminder);
  });

  // Convierte el objeto a un array de ReminderAgendaType
  return Object.entries(groupedReminders).map(([date, data]) => ({
    title: date,
    data,
  }));
};
