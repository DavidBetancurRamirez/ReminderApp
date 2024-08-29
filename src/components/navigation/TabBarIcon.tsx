// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

export const TabBarIcon = ({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) => {
  return <Ionicons size={20} style={[{ marginBottom: -3 }, style]} {...rest} />;
}


interface TabBarUpgradeProps extends IconProps<ComponentProps<typeof Ionicons>['name']> {
  backgroundColor: string;
}

export const TabBarUpgrade = ({ style, backgroundColor, ...rest }: TabBarUpgradeProps) => {
  return (
    <View style={[styles.upgradeButtonContainer, { backgroundColor }]}>
      <Ionicons size={20} style={style} {...rest} />
    </View>
  )
}

const styles = StyleSheet.create({
  upgradeButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Sombra para Android
  }
});
