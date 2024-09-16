import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme, LightTheme } from '../constants/themes';
import { useThemeColor } from '../hooks/useThemeColor';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <SafeAreaView style={{flex:1}}>
        <Container />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const Container = () => {
  const { theme } = useTheme();
  const navigationTheme = theme === 'dark' ? DarkTheme : LightTheme;
  const background = useThemeColor("background")

  useEffect(() => {
    const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';
    StatusBar.setBarStyle(barStyle, true);
    StatusBar.setBackgroundColor(background);
    StatusBar.setTranslucent(true);
  }, [theme]);

  return (
    <NavigationContainer theme={navigationTheme} independent={true}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </NavigationContainer>
  )
}
