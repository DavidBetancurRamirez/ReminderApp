import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '../hooks/useThemeColor';

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();
  const color = useThemeColor('text');

  return (
    <Pressable onPress={toggleTheme}>
      <Ionicons 
        name="sunny"
        size={24}
        color={color} 
      />
    </Pressable>
  );
};

export default ThemeToggleButton;