import React from 'react';
import { Button, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <View>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default ThemeToggleButton;