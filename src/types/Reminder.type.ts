export type ReminderType = {
  id: string;
  name: string;
  date: string;
  hour: string;
  group?: string;
}

export type ReminderAgendaType = {
  title: string;
  data: ReminderType[];
}
