import useReminderStorage from '@/src/hooks/useReminderStorage';
import { ThemedText } from '../../components/Theme/ThemedText';
import { ThemedView } from '../../components/Theme/ThemedView';
import ThemeToggleButton from '../../components/Theme/ThemeToggleButton';
import React from 'react'
import { Alert, Button, StyleSheet } from 'react-native';
import { errorAlert } from '@/src/utils/errorAlert.util';

const Profile = () => {  
  const { deleteReminders } = useReminderStorage();

  const handlePress = () => {
    try {
      deleteReminders();
  
      Alert.alert("Message", "Reminders eliminados");      
    } catch (error) {
      errorAlert(error)
    }
  }

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile!</ThemedText>
        <ThemeToggleButton />
      </ThemedView>
      <Button title='Eliminar reminders' onPress={handlePress} />
    </>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    container: {
      flex: 1,
      backgroundColor: 'blue', // Cambia esto al color de fondo que prefieras
    },
  });

export default Profile;