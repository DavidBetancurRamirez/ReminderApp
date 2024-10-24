import { ThemedText } from '../../components/Theme/ThemedText';
import { ThemedView } from '../../components/Theme/ThemedView';
import useReminderStorage from '../../hooks/useReminderStorage';
import { useThemeColor } from '../../hooks/useThemeColor';
import { ReminderProps } from '../../types/Reminder.type';
import { formatDate } from '../../utils/date.util';
import React, { useState } from 'react';
import { TextInput, Switch, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';

const ManualReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [group, setGroup] = useState("");

  const cardColor = useThemeColor("card");
  const buttonColor = useThemeColor("button");

  const { onSaveReminder } = useReminderStorage();

  const resetStates = () => {
    setTitle("");
    setLocation("");
    setIsAllDay(false);
    setStartTime("");
    setEndTime("");
    setDate(new Date());
    setGroup("");
  }

  const handleSave = async () => {
    try {
      validateStates()
      const data: ReminderProps = createReminderData();
  
      await onSaveReminder(data);
  
      resetStates();
      Alert.alert("Reminder saved succesfully");
    } catch (error) {
      let errorMessage = "An unknown error has occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      Alert.alert("Error", errorMessage);
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

  // Funciones temporales
  const validateStates = () => {
    const states = [
      { name: 'title', value: title },
    ];

    if (!isAllDay) {
      states.push({ name: 'startTime', value: startTime })
      states.push({ name: 'endTime', value: endTime })
    }
  
    states.forEach(({ name, value }) => {
      if (!validateStringStates(value)) {
        throw new Error(`Campo vacío: ${name}`);
      }
    });
  }
  const validateStringStates = (state: string) => {
    return state.trim().length > 0
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>New Reminder</ThemedText>

        <TextInput
          style={[{ backgroundColor: cardColor }, styles.input]}
          placeholder="Title"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[{ backgroundColor: cardColor }, styles.input]}
          placeholder="Location or Link"
          placeholderTextColor="#aaa"
          value={location}
          onChangeText={setLocation}
        />

        <ThemedView style={styles.switchContainer}>
          <ThemedText style={styles.switchLabel}>All day</ThemedText>
          <Switch 
            value={isAllDay} 
            onValueChange={setIsAllDay} 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAllDay ? "#f5dd4b" : "#f4f3f4"}
          />
        </ThemedView>

        {!isAllDay && (
          <>
            <TextInput
              style={[{ backgroundColor: cardColor }, styles.input]}
              placeholder="Starts"
              placeholderTextColor="#aaa"
              value={startTime}
              onChangeText={setStartTime}
            />
            <TextInput
              style={[{ backgroundColor: cardColor }, styles.input]}
              placeholder="Ends"
              placeholderTextColor="#aaa"
              value={endTime}
              onChangeText={setEndTime}
            />
          </>
        )}

        <Button 
          title="Save Reminder" 
          color={buttonColor}
          onPress={handleSave} 
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
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
    fontSize: 16,
  }
});

export default ManualReminderScreen;