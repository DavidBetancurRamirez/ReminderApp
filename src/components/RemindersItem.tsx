import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ThemedText} from '../components/ThemedText'; // Ajustar la ruta según tu proyecto
import {ThemedView} from '../components/ThemedView'; // Ajustar la ruta según tu proyecto

interface ReminderItemProps {
  reminderTitle: string;
  reminderDate: string;
  reminderGroup?: string;
}

const ReminderItem: React.FC<ReminderItemProps> = ({ reminderTitle, reminderDate, reminderGroup }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* Icono de campanita usando Ionicons */}
      <Ionicons name="notifications" size={24} color="white" style={styles.icon} />

      {/* Información del recordatorio usando ThemedView y ThemedText */}
      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.title}>{reminderTitle}</ThemedText>
        <ThemedText style={styles.date}>{reminderDate}</ThemedText>
        {reminderGroup && <ThemedText style={styles.group}>{reminderGroup}</ThemedText>}
      </ThemedView>

      {/* Flecha derecha usando Ionicons */}
      <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E3E3E',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#ccc',
    fontSize: 14,
  },
  group: {
    color: '#aaa',
    fontSize: 12,
  },
  arrow: {
    marginLeft: 'auto',
  },
});

export default ReminderItem;
