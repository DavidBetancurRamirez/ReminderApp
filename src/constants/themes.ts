import type { Theme } from '@react-navigation/native';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

export type CustomTheme = Theme & {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    button: string;
    buttonHover: string;
    danger: string;
  };
};

export const DarkTheme: CustomTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#2E7D4B',
    background: '#141414',
    card: '#3C3C3C',
    text: '#F2F2F2',
    textSecondary: '#B0B0B0',
    border: '#2E2E2E',
    button: '#2E7D4B',
    buttonHover: '#1D6A40',
    danger: '#D32F2F',
  },
};

export const LightTheme: CustomTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#2E7D4B',
    background: '#F2F2F2',
    card: '#D6D6D6',
    text: '#141414',
    textSecondary: '#3C3C3C',
    border: '#DADADA',
    button: '#2E7D4B',
    buttonHover: '#1D6A40',
    danger: '#D32F2F',
  },
};
