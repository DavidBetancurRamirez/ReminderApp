import { useCallback, useState } from 'react'
import Card from './Card';
import Group from './Group';
import { Icon } from './Icon';
import { useForm } from '../hooks/useForm';
import { useFocusEffect } from 'expo-router';
import { ThemedText } from './Theme/ThemedText';
import { ThemedView } from './Theme/ThemedView';
import { errorAlert } from '../utils/errorAlert.util';
import ThemedTextInput from './Theme/ThemedTextInput';
import useGroupStorage from '../hooks/useGroupStorage';
import { useThemeColor } from '../hooks/useThemeColor';
import { GroupProps, GroupType } from '../types/Group.type';
import { View, StyleSheet, Modal, Alert, FlatList, Dimensions } from 'react-native'

const { height } = Dimensions.get('window');

type GroupModalProps = {
  visible: boolean;
  onClose: () => void;
  select?: (id: string) => void;
}

const baseState: GroupProps = {
  name: "",
}

const GroupModal = ({ visible, onClose, select }: GroupModalProps) => {
  const [groups, setGroups] = useState<GroupType[]>([]);

  const { form, handleChange, handleReset } = useForm<GroupProps>(baseState);

  const buttonColor = useThemeColor("button");

  const { onGetGroups, onSaveGroup, onRemoveGroup } = useGroupStorage();

  const loadGroups = useCallback(async () => {
    try {
      const groupsResponse = await onGetGroups();
      setGroups(groupsResponse);
    } catch (error) {
      setGroups([]);
      errorAlert(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGroups().catch(null);
    }, [loadGroups])
  );

  const handleAddPress = async () => {
    try {
      await onSaveGroup({ name: form.name }, groups)

      Alert.alert("Message", "Group saved succesfully");
      
      handleReset();
      await loadGroups();
    } catch (error) {
      errorAlert(error);
    }
  };

  const handleRemovePress = async (id: string) => {
    try {
      await onRemoveGroup(id);

      Alert.alert("Message", "Group removed succesfully");
      loadGroups();
    } catch (error) {
      errorAlert(error);
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
            <Card 
              style={[
                { backgroundColor: buttonColor }, 
                styles.buttonContainer
              ]}
              onPress={handleAddPress}
            >
              <Icon 
                name='add' 
                size={25}
              />
            </Card>
          </View>

          <ThemedText style={styles.listTitle}>Your Groups</ThemedText>

          <View style={styles.listContainer}>
            {groups.length > 0 ?
              <FlatList 
                data={groups}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                  <Group 
                    id={item.id}
                    name={item.name} 
                    remove={handleRemovePress}
                    select={select}
                  />
                }
                initialNumToRender={10}
              />
            :
              <View style={styles.messageContainer}>
                <ThemedText type='light'>There are no groups yet</ThemedText>
              </View>
            }
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
  messageContainer: {
    alignItems: "center"
  },
})

export default GroupModal