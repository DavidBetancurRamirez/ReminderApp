import React from 'react'
import { Icon } from './Icon'
import { View, StyleSheet, ViewProps } from 'react-native'
import { ThemedText } from './Theme/ThemedText'
import { useThemeColor } from '../hooks/useThemeColor'
import { GroupProps, GroupType } from '../types/Group.type'

export type GroupComponentProps = GroupType & ViewProps & {
  remove: (id: string) => void;
  select?: (id: string) => void;
}

const Group = ({ id, name, remove, select, style, ...rest }: GroupComponentProps) => {
  const cardColor = useThemeColor("card");

  return (
    <View 
      style={[
        { backgroundColor: cardColor }, 
        styles.container,
        style
      ]}
      {...rest}
    >
      <ThemedText style={styles.name}>{name}</ThemedText>
      <Icon 
        name='remove-circle-outline' 
        size={24}
        onPress={() => remove(id)}
        style={select && {marginHorizontal: 10}}
      />
      {select && 
        <Icon
          name='add-circle-outline'
          size={24}
          onPress={() => select(id)}
        />
      }
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
})

export default Group