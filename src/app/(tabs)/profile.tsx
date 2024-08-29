import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import ThemeToggleButton from '@/src/components/ThemeToggleButton';
import { useTheme } from '@/src/context/ThemeContext';
import React from 'react'
import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { theme } = useTheme();
  
  return (
      <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Profile!</ThemedText>
          <ThemedView>
            <ThemeToggleButton />
            <ThemedText type="title">{theme}</ThemedText>
          </ThemedView>
      </ThemedView>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
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