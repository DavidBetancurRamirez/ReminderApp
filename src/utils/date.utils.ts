import { differenceInDays, format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "yyyy/dd/MM");
}

export const startOfDay = (date: Date | string) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const dateName = (dateString: string) => {
  const today = startOfDay(new Date());
  const date = startOfDay(new Date(dateString));

  const diffDays = differenceInDays(
    date,
    today,
  );

  if (diffDays === 0) return 'Today';
  else if (diffDays === -1) return 'Yesterday';
  else if (diffDays === 1) return 'Tomorrow';
  else return dateString;
};