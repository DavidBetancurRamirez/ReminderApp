import { useState } from 'react';
import Card from '@/src/components/Card';
import { useForm } from '../../hooks/useForm';
import { useThemeColor } from '../../hooks/useThemeColor';
import GroupSelector from '@/src/components/GroupSelector';
import ThemedSwitch from '../../components/Theme/ThemedSwitch';
import { ThemedText } from '../../components/Theme/ThemedText';
import useReminderStorage from '../../hooks/useReminderStorage';
import DateTimeSelector from '@/src/components/DateTimeSelector';
import ThemedTextInput from '../../components/Theme/ThemedTextInput';
import { StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { errorAlert } from '@/src/utils/errorAlert.util';

const baseState = {
  name: "",
  group: "",
  location: "",
  description: "",
  startTime: new Date(),
  endTime: new Date(),
}

const ManualReminderScreen = () => {
  const [details, setDetails] = useState(false);

  const { form, handleChange, handleReset } = useForm(baseState);

  const buttonColor = useThemeColor("button");

  const { onSaveReminder } = useReminderStorage();

  const handleSave = async () => {
    try {
      // TODO: Validaciones
      // await onSaveReminder(form);

      console.log(form)
  
      handleReset();
    } catch (error) {
      errorAlert(error);
    }
  };

  const handleRemoveGroup = () => {
    console.log("Remove Group")
  }
  
  const handleSelectGroup = () => {
    console.log("Add Group")
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
            <GroupSelector group={form.group} remove={handleRemoveGroup} add={handleSelectGroup} />

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

        <Card 
          style={[
            { backgroundColor: buttonColor }, 
            styles.button
          ]}
          onPress={handleSave}
        >
          <ThemedText>Save Reminder</ThemedText>
        </Card>
        
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
  button: {
    marginVertical: 20,
    justifyContent: "center"
  }
});

export default ManualReminderScreen;