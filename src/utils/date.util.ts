import { differenceInDays, format, parse } from "date-fns";

export const dateAgendaFormat = "yyyy-MM-dd";

export const formatDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy');
}

export const formatDateAgenda = (date: Date) => {
  return format(date, dateAgendaFormat);
}

export const formatTime = (date: Date) => {
  return format(date, 'hh:mm aa');
}

export const startOfDay = (date: Date | string) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const dateName = (dateString: string) => {
  const date = parse(dateString, dateAgendaFormat, new Date());
  const today = startOfDay(new Date());

  const diffDays = differenceInDays(
    date,
    today,
  );

  if (diffDays === 0) return 'Today';
  else if (diffDays === -1) return 'Yesterday';
  else if (diffDays === 1) return 'Tomorrow';
  else return dateString;
};
