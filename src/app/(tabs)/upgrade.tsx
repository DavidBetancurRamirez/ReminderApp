import React from 'react';
import Upload from '../upload/upload';
import UploadCSVScreen from '../upload/reminderFromCSV';
import ManualReminderScreen from '../upload/manualReminder';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../../components/Theme/ThemedView';

const Stack = createNativeStackNavigator();

const Upgrade = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ThemedView style={{
      flex: 1,
      marginTop: -top
    }}>
      <Stack.Navigator initialRouteName="UpgradeScreen" >
        <Stack.Screen
          name="UpgradeScreen" 
          component={Upload} 
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
    </ThemedView>
  );
}

export default Upgrade;