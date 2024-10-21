import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';

const ManualReminderScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const buttonColor = useThemeColor("button");
  const cardColor = useThemeColor("card");
  const textColor = useThemeColor("text");
  const hoverColor = useThemeColor("primary");
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>New Reminder</ThemedText>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: cardColor },
          isFocused && { backgroundColor: hoverColor }
        ]}
        placeholder="Title"
        placeholderTextColor={textColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TextInput
        style={[styles.input, { backgroundColor: cardColor}]}
        placeholder="Location or Link"
        placeholderTextColor={textColor}
        value={location}
        onChangeText={setLocation}
      />

      <ThemedView style={styles.switchContainer}>
        <ThemedText style={styles.switchLabel}>All day</ThemedText>
        <Switch 
          value={isAllDay} 
          onValueChange={setIsAllDay} 
          trackColor={{ false: cardColor, true: "#81b0ff" }}
          thumbColor={isAllDay ? "#2E7D4B" : "#f4f3f4"}
        />
      </ThemedView>

      {!isAllDay && (
        <>
          <TextInput
        style={[styles.input, { backgroundColor: cardColor}]}
        placeholder="Starts"
            placeholderTextColor={textColor}
            value={startTime}
            onChangeText={setStartTime}
          />
          <TextInput
        style={[styles.input, { backgroundColor: cardColor}]}
        placeholder="Ends"
            placeholderTextColor={textColor}
            value={endTime}
            onChangeText={setEndTime}
          />
        </>
      )}

      <Button title="Save Reminder" onPress={() => {/* Handle save */}} color={buttonColor} />
    </ThemedView>
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