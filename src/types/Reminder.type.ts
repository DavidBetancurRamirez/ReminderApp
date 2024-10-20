export type BaseReminderProps = {
  name: string;
  date: string;
  group?: string;
};

export type ReminderProps = 
  | BaseReminderProps & { 
    allDay: true 
  }
  | (BaseReminderProps & { 
    allDay: false; 
    startTime: string; 
    endTime: string 
  });

export type ReminderType = ReminderProps & {
  id: string | number[];
}

export type ReminderAgendaType = {
  title: string;
  data: ReminderType[];
}
