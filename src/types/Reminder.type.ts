import { GroupType } from "./Group.type";

export type ReminderProps = {
  name: string;
  startTime: Date;
  endTime: Date;
  group: GroupType | undefined;
  location: string;
  description: string;
}

export type ReminderType = ReminderProps & {
  id: string;
}

export type ReminderAgendaType = {
  title: string;
  data: ReminderType[];
}
