import { View, StyleSheet, Modal, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import Card from './Card';
import { ThemedText } from './Theme/ThemedText';

type AddFoodModalProps = {
  visible: boolean;
  onClose: (shouldUpdate ?: boolean) => void;
}

const GroupModal = ({ visible, onClose }: AddFoodModalProps) => {
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    setGroupName("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      // TODO: Save group
      console.log(groupName)

      Alert.alert("Group saved succesfully");
      onClose(true);
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
        <View style={styles.content}>
          
          <View style={styles.closeContainer}>
            <Card onPress={() => onClose()}>
              <ThemedText>Close</ThemedText>
            </Card>
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.legend}>Input here</ThemedText>
            </View>
            <View style={styles.legendContainer}>
              <ThemedText style={styles.legend}>Name</ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Card>
              <ThemedText>Add</ThemedText>
            </Card>
          </View>

        </View>
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
    width: "75%",
    backgroundColor: "#fff",
    padding: 18,
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
    alignItems: "center",
  },
  inputContainer: {
    flex: 2
  },
  legendContainer: {
    flex: 1
  },
  legend: {
    fontWeight: "500"
  },
  buttonContainer: {
    alignItems: "flex-end"
  }
})

export default GroupModal