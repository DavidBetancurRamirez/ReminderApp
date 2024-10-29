import Card from './Card';
import { Icon } from './Icon';
import { isSameDay } from 'date-fns';
import { ThemedText } from './Theme/ThemedText';
import { StyleSheet, View } from 'react-native';
import { ReminderProps } from '../types/Reminder.type';
import { dateName, formatTime } from '../utils/date.util';

const Reminder = (reminder: ReminderProps) => {
  return (
    <Card style={styles.card}>
      <Icon name="notifications" size={30} />

      <View style={styles.infoContainer}>
        <ThemedText style={styles.title}>{reminder.name}</ThemedText>

        <ThemedText style={styles.date}>
          {dateName(reminder.startTime)}
          {!isSameDay(reminder.startTime, reminder.endTime) && 
            "  |  " + dateName(reminder.endTime)
          }
        </ThemedText>

        <ThemedText type='light'>
          {formatTime(reminder.startTime)} - {formatTime(reminder.endTime)}
        </ThemedText>
      </View>

      <Icon name="chevron-forward-outline" size={30} />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  date: {
    fontWeight: "300",
  },
});

export default Reminder;
