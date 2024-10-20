import useReminderStorage from '@/src/hooks/useReminderStorage';
import { ReminderProps } from '@/src/types/Reminder.type';
import { formatDate } from '@/src/utils/date.util';
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';

const ManualReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [group, setGroup] = useState("");

  const { onSaveReminder } = useReminderStorage();

  const handleSave = async () => {
    try {
      const data: ReminderProps = createReminderData();
  
      await onSaveReminder(data);
  
      console.log("Saved");
    } catch (error) {
      console.error(error);
    }
  };

  const createReminderData = (): ReminderProps => {
    return isAllDay
      ? {
        name: title,
        date: formatDate(date),
        allDay: true,
        group,
      }
      : {
        name: title,
        date: formatDate(date),
        allDay: false,
        startTime: startTime,
        endTime: endTime,
        group,
      };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Location or Link"
        placeholderTextColor="#aaa"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>All day</Text>
        <Switch 
          value={isAllDay} 
          onValueChange={setIsAllDay} 
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isAllDay ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      {!isAllDay && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Starts"
            placeholderTextColor="#aaa"
            value={startTime}
            onChangeText={setStartTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Ends"
            placeholderTextColor="#aaa"
            value={endTime}
            onChangeText={setEndTime}
          />
        </>
      )}

      <Button title="Save Reminder" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2b2b2b',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    color: 'white',
    fontSize: 16,
  }
});

export default ManualReminderScreen;