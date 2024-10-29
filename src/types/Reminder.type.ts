import { GroupType } from "./Group.type";

export type BaseReminderProps = {
  name: string;
  date: string;
  group?: string;
};

export type ReminderProps = {
  name: string;
  startTime: Date;
  endTime: Date;
  group: GroupType | undefined;
  location: string;
  description: string;
}

export type ReminderType = ReminderProps & {
  id: string | number[];
}

export type ReminderAgendaType = {
  title: string;
  data: ReminderType[];
}
