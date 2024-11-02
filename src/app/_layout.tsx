import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useThemeColor } from '../hooks/useThemeColor';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const Navigation = () => {
  const { theme } = useTheme();
  const background = useThemeColor("background");

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(background);
      StatusBar.setTranslucent(true);
    }
  }, [theme]);

  return (
    <>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  )
}
