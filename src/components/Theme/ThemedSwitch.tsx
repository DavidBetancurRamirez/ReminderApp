import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '../..//hooks/useThemeColor';
import { StyleSheet, Switch, SwitchProps } from 'react-native';

type ThemedSwitchProps = SwitchProps & {
  text: string;
  enabled: boolean
}

const ThemedSwitch = ({ text, enabled, ...rest }: ThemedSwitchProps) => {
  const c1 = useThemeColor("primary");
  const c2 = useThemeColor("card");
  const c3 = useThemeColor("buttonHover");
  const c4 = useThemeColor("text");

  return (
    <ThemedView style={styles.switchContainer}>
      <ThemedText style={styles.switchLabel}>{text}</ThemedText>
      <Switch
        trackColor={{ true: c1, false: c2 }}
        thumbColor={enabled ? c3 : c4}
        {...rest}
      />
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  switchLabel: {
    fontSize: 16,
  }
})

export default ThemedSwitch