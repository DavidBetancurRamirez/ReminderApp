import React, { useEffect } from 'react';
import AddUpload from '../add/addUpload';
import AddReminder from '../add/addReminder';
import AddNavigation from '../add/addNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Platform, StatusBar } from 'react-native';
import { useTheme } from '@/src/context/ThemeContext';

const Stack = createNativeStackNavigator();

const Upgrade = () => {
  const { theme } = useTheme();
  const cardColor = useThemeColor("card");
  const tintColor = useThemeColor("text");

  return (
    <Stack.Navigator 
      initialRouteName="AddNavigation"
      screenOptions={{
        headerStyle: {
          backgroundColor: cardColor,
        },
        headerTintColor: tintColor
      }}
    >
      <Stack.Screen
        name="AddNavigation" 
        component={AddNavigation} 
        options={{ 
          headerShown: false, 
          title: 'Add'
        }}
      />
      <Stack.Screen
        name="AddReminder" 
        component={AddReminder} 
        options={{ 
          title: 'Form',
          headerBackground: () => (
            <>
              {Platform.OS === "android" &&
                <StatusBar
                  backgroundColor={cardColor}
                  barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
                />
              }
            </>
          ),
        }} 
      />
      <Stack.Screen
        name="AddUpload" 
        component={AddUpload} 
        options={{ 
          title: 'Upload',
          headerBackground: () => (
            <>
              {Platform.OS === "android" &&
                <StatusBar
                  backgroundColor={cardColor}
                  barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
                />
              }
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default Upgrade;