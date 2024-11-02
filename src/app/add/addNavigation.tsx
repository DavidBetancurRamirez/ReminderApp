import Card from "../../components/Card";
import { StyleSheet } from "react-native";
import { Icon } from "../../components/Icon";
import { ThemedText } from "../../components/Theme/ThemedText";
import { ThemedView } from "../../components/Theme/ThemedView";

const AddNavigation = ({ navigation }: any) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Select how to upload your reminders</ThemedText>
      
      <Card 
        style={styles.option}
        onPress={() => navigation.navigate('AddReminder')}
      >
        <Icon name='create-sharp' size={80} style={styles.icon} />
        <ThemedText type='subtitle'>Form</ThemedText>
      </Card>

      <Card 
        style={styles.option}
        onPress={() => navigation.navigate('AddUpload')}
      >
        <Icon name='file-tray-full' size={80} style={styles.icon} />
        <ThemedText type='subtitle'>Upload a CSV file</ThemedText>
      </Card>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 30,
    minWidth: "70%"
  },
  icon: {
    marginBottom: 10
  }
});

export default AddNavigation;