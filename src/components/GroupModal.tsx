import { View, StyleSheet, Modal, Alert, FlatList, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import Card from './Card';
import { ThemedText } from './Theme/ThemedText';
import { ThemedView } from './Theme/ThemedView';
import { Icon } from './Icon';
import ThemedTextInput from './Theme/ThemedTextInput';
import { useForm } from '../hooks/useForm';
import { useThemeColor } from '../hooks/useThemeColor';
import Group from './Group';
import { GroupProps } from '../types/Group.type';

const { height } = Dimensions.get('window');

type GroupModalProps = {
  visible: boolean;
  onClose: () => void;
  add: () => void;
}

const baseState = {
  name: "",
}

const DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: `Elemento ${i + 1}`,
}));

const GroupModal = ({ visible, onClose, add }: GroupModalProps) => {
  const { form, handleChange, handleReset } = useForm<GroupProps>(baseState);

  const buttonColor = useThemeColor("button");

  const handleAddPress = async () => {
    try {
      // TODO: Save group
      console.log(form.name)

      Alert.alert("Group saved succesfully");
      handleReset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemovePress = async () => {
    try {
      // TODO: Save group
      console.log(form.name)

      Alert.alert("Group removed succesfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal 
      visible={visible} 
      onRequestClose={() => onClose()} 
      transparent
      animationType="slide"
    > 
      <View style={styles.container}>
        <ThemedView style={styles.content}>
          
          <View style={styles.closeContainer}>
            <Icon 
              name='close' 
              size={25}
              onPress={() => onClose()} 
            />
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <ThemedTextInput 
                keyName="name"
                title='Create new Group'
                placeholder='Group name'
                form={form} 
                setValue={handleChange}
              />
            </View>
            <Card style={[
              {
                backgroundColor: buttonColor
              }, 
              styles.buttonContainer
            ]}>
              <Icon 
                name='add' 
                size={25} 
                onPress={handleAddPress}
              />
            </Card>
          </View>

          <ThemedText style={styles.listTitle}>Your Groups</ThemedText>

          <View style={styles.listContainer}>
            <FlatList 
              data={DATA}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>
                <Group name={item.name} remove={() => handleRemovePress()} add={add} />
              }
              initialNumToRender={10}
            />
          </View>

        </ThemedView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  content: {
    width: "80%",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeContainer: {
    alignItems: "flex-end"
  },
  formItem: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputContainer: {
    flex: 1
  },
  buttonContainer: {
    marginLeft: 10,
    marginBottom: 8,
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  listTitle: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#fff",
    borderStyle: 'dashed',
    paddingVertical: 5
  },
  listContainer: {
    maxHeight: height * 0.3,
    overflow: 'hidden', 
  },
})

export default GroupModal