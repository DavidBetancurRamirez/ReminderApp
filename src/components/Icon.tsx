// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomTheme } from '../constants/themes';
import { useThemeColor } from '../hooks/useThemeColor';

interface IIcon extends IconProps<ComponentProps<typeof Ionicons>['name']> {
  type?: "default" | "tabBar";
  color?: keyof CustomTheme['colors'];
  size?: number;
}

// Icono Reutilizable
export const Icon = ({ style, type="default", color="text", size=20, ...rest }: IIcon) => {
  return (
    <Ionicons 
      size={size} 
      color={useThemeColor(color)} 
      style={[
        type=="tabBar" ? { marginBottom: -3 } : {}, 
        style
      ]} 
      {...rest} 
    />
  )
}


interface TabBarUpgradeProps extends IIcon {
  backgroundColor?: string;
}

// TabBar Upgrade Icon
export const TabBarUpgrade = ({ style, type="default", color="text", size=20, backgroundColor, ...rest }: TabBarUpgradeProps) => {
  return (
    <View style={[styles.upgradeButtonContainer, { backgroundColor }]}>
      <Icon color={color} size={size} style={style} {...rest} />
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
