import React from 'react'
import { Icon } from './Icon'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from './Theme/ThemedText'
import { useThemeColor } from '../hooks/useThemeColor'
import { GroupProps } from '../types/Group.type'

type GroupComponentProps = GroupProps & {
  remove: () => void;
  add: () => void;
}

const Group = ({ name, remove, add }: GroupComponentProps) => {
  const cardColor = useThemeColor("card");

  return (
    <View style={[
      {
        backgroundColor: cardColor
      }, 
      styles.container
    ]}>
      <ThemedText style={styles.name}>{name}</ThemedText>
      <Icon 
        name='remove-circle-outline' 
        size={24}
        onPress={remove}
        style={styles.leftIcon}
      />
      <Icon 
        name='add-circle-outline'
        size={24}
        onPress={add}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  name: {
    flex: 1
  },
  leftIcon: {
    marginHorizontal: 10
  }
})

export default Group