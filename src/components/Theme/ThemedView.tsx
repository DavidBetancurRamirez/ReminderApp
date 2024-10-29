import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { CustomTheme } from '../../constants/themes';

export type ThemedViewProps = ViewProps & {
  background?: keyof CustomTheme['colors']; 
};

export function ThemedView({ style, background="background", ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(background);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
