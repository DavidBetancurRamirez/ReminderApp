import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Group from './Group'
import { ThemedText } from './Theme/ThemedText'
import Card from './Card'
import GroupModal from './GroupModal'

const GroupSelector = ({ group, remove, add }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = async () => {
    setModalVisible(false);
  }

  return (
    <>
      <View style={styles.selectGroup}>
        {group ?
          <Group name={group} remove={remove} add={add} id="" />
        :
          <ThemedText>No group selected</ThemedText>
        }
        <Card 
          onPress={() => setModalVisible(true)}
          style={styles.groupButton}
        >
          <ThemedText>{group ? "Change" : "Select"} group</ThemedText>
        </Card>
      </View>

      <GroupModal visible={modalVisible} onClose={handleModalClose} add={add} />
    </>
  )
}

const styles = StyleSheet.create({
  selectGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  groupButton: {
    paddingHorizontal: 15
  },  
})

export default GroupSelector