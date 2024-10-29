import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { CustomTheme } from '../../constants/themes';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'inputTitle' | 'title' | 'light' | 'subtitle' | 'link';
  textColor?: keyof CustomTheme['colors'];
};

export function ThemedText({
  style,
  type = 'default',
  textColor = 'text',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(textColor);

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'inputTitle' ? styles.inputTitle : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'light' ? styles.light : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  inputTitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 2,
  },
  light: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '200',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
