import { useState } from 'react';
import Card from '@/src/components/Card';
import Group from '@/src/components/Group';
import { useForm } from '../../hooks/useForm';
import GroupModal from '@/src/components/GroupModal';
import { errorAlert } from '@/src/utils/errorAlert.util';
import { ReminderProps } from '@/src/types/Reminder.type';
import useGroupStorage from '@/src/hooks/useGroupStorage';
import { useThemeColor } from '../../hooks/useThemeColor';
import ThemedSwitch from '../../components/Theme/ThemedSwitch';
import { ThemedText } from '../../components/Theme/ThemedText';
import useReminderStorage from '../../hooks/useReminderStorage';
import DateTimeSelector from '@/src/components/DateTimeSelector';
import ThemedTextInput from '../../components/Theme/ThemedTextInput';
import { StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const baseState: ReminderProps = {
  name: "",
  location: "",
  description: "",
  group: undefined,
  startTime: new Date(),
  endTime: new Date(),
}

const ManualReminderScreen = () => {
  const [details, setDetails] = useState(false);
  const [groupModalVisible, setGroupModalVisible] = useState(false);

  const { form, handleChange, handleReset } = useForm<ReminderProps>(baseState);

  const buttonColor = useThemeColor("button");

  const { onSaveReminder } = useReminderStorage();
  const { onGetGroup } = useGroupStorage();

  const handleSave = async () => {
    try {
      await onSaveReminder(form);

      Alert.alert("Message", "Reminder saved succesfully");
  
      handleReset();
    } catch (error) {
      errorAlert(error);
    }
  };

  const handleRemoveGroup = () => {
    handleChange({ key: 'group', value: undefined });
  }
  
  const handleSelectGroup = async (id: string) => {
    try {
      const group = await onGetGroup(id);

      handleChange({ key: 'group', value: group });

      handleGroupModalClose();
    } catch (error) {
      errorAlert(error);      
    }
  }

  const handleGroupModalClose = async () => {
    setGroupModalVisible(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <ThemedText style={styles.title}>New Reminder</ThemedText>

        <ThemedTextInput 
          keyName="name"
          form={form} 
          setValue={handleChange} 
        />

        <View style={styles.dateContainer}>
          <DateTimeSelector
            title="Start"
            keyName="startTime"
            date={form.startTime}
            setDate={handleChange}
          />

          <DateTimeSelector
            title="End"
            keyName="endTime"
            date={form.endTime}
            minimumDate={form.startTime}
            setDate={handleChange}
          />
        </View>

        <ThemedSwitch 
          text="Add details"
          enabled= {details}
          value={details}
          onValueChange={() => setDetails(!details)}
        />

        {details && (
          <>
            <View style={styles.groupContainer}>
              <View style={styles.groupContent}>
                {form.group ?
                  <Group 
                    {...form.group}
                    remove={handleRemoveGroup} 
                    style={styles.group}
                  />
                :
                  <ThemedText>No group selected</ThemedText>
                }
              </View>
              <Card 
                onPress={() => setGroupModalVisible(true)}
                style={styles.groupButton}
              >
                <ThemedText>{form.group ? "Change" : "Select"} group</ThemedText>
              </Card>
            </View>

            <ThemedTextInput 
              keyName="location" 
              form={form} 
              setValue={handleChange} 
            />
    
            <ThemedTextInput 
              keyName="description" 
              form={form} 
              setValue={handleChange} 
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
          </>
        )}

        <View style={styles.endSpace}>
          <Card 
            style={[
              { backgroundColor: buttonColor }, 
              styles.button
            ]}
            onPress={handleSave}
          >
            <ThemedText>Save Reminder</ThemedText>
          </Card>
        </View>
        
        <GroupModal 
          visible={groupModalVisible} 
          onClose={handleGroupModalClose} 
          select={handleSelectGroup} 
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  dateContainer: {
    flexDirection: "row",
  },
  groupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    alignItems: "center",
  },
  groupContent: {
    flex: 1,
    marginRight: 15
  },
  group: {
    marginBottom: 0,
    padding: 8,
  },
  groupButton: {
    paddingHorizontal: 15
  }, 
  button: {
    justifyContent: "center",
  },
  endSpace: {
    marginTop: 20,
    marginBottom: 80
  }
});

export default ManualReminderScreen;