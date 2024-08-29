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
  },
};

export const DefaultTheme: CustomTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#2E7D4B',
    background: '#FFFFFF',
    card: '#F2F2F2',
    text: '#3C3C3C',
    textSecondary: '#000000',
    border: '#DADADA',
    button: '#2E7D4B',
    buttonHover: '#1D6A40',
  },
};
