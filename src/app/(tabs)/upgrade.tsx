// src/app/tabs/upgrade.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManualReminderScreen from '../upload/manualReminder';
import UploadCSVScreen from '../upload/reminderFromCSV';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useThemeColor } from '@/src/hooks/useThemeColor';

const Stack = createNativeStackNavigator();

const UpgradeScreen = ({ navigation }: any) => {
  const backgroundColor = useThemeColor("button");

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Select how to upload your reminders</ThemedText>
      <View style={{ height: 20 }} />
      
      <TouchableOpacity 
        style={[{backgroundColor}, styles.option]}
        onPress={() => navigation.navigate('ManualReminder')}
      >
        <ThemedText>Create a reminder manually</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[{backgroundColor}, styles.option]}
        onPress={() => navigation.navigate('UploadCSV')}
      >
        <ThemedText>Upload a CSV file</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

// Navegación stack dentro de Upgrade
export default () => {
  return (
    <Stack.Navigator initialRouteName="UpgradeScreen">
      <Stack.Screen 
        name="UpgradeScreen" 
        component={UpgradeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ManualReminder" 
        component={ManualReminderScreen} 
        options={{ title: 'Form' }} 
      />
      <Stack.Screen 
        name="UploadCSV" 
        component={UploadCSVScreen} 
        options={{ title: 'CSV' }} 
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
});
