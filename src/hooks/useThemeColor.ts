import { DefaultTheme, DarkTheme, CustomTheme } from '../constants/themes';
import { Theme, useTheme } from '../context/ThemeContext';

export const getTheme = (colorScheme: Theme): CustomTheme => colorScheme === 'dark' ? DarkTheme : DefaultTheme;

export function useThemeColor(colorName: keyof CustomTheme['colors']) {
  const { theme } = useTheme();

  const color = getTheme(theme);
  
  return color.colors[colorName];
}
