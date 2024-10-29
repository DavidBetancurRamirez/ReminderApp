import { formatDateAgenda } from "./date.util";
import { ReminderAgendaType, ReminderType } from "../types/Reminder.type";

export const groupRemindersByDate = (reminders: ReminderType[]): ReminderAgendaType[] => {
  const groupedReminders: Record<string, ReminderType[]> = {};

  reminders.forEach((reminder) => {
    const dateKey = formatDateAgenda(reminder.startTime);
    
    if (!groupedReminders[dateKey]) {
      groupedReminders[dateKey] = [];
    }
    
    groupedReminders[dateKey].push(reminder);
  });

  return Object.entries(groupedReminders).map(([date, data]) => ({
    title: date,
    data,
  }));
};
