import ThemedTextInput from '../../components/Theme/ThemedTextInput';
import { ThemedText } from '../../components/Theme/ThemedText';
import useReminderStorage from '../../hooks/useReminderStorage';
import { useThemeColor } from '../../hooks/useThemeColor';
import { StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useForm } from '../../hooks/useForm';
import ThemedSwitch from '../../components/Theme/ThemedSwitch';
import DateTimeSelector from '@/src/components/DateTimeSelector';
import { useState } from 'react';
import GroupSelector from '@/src/components/GroupModal';
import Card from '@/src/components/Card';

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
  const [modalVisible, setModalVisible] = useState(false);

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
      let errorMessage = "An unknown error has occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      Alert.alert("Error", errorMessage);
      console.error(error);
    }
  };

  const handleModalClose = async (shouldUpdate ?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Food saved succesfully");
    }
    setModalVisible(false);
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
            <Card onPress={() => setModalVisible(true)}>
              <ThemedText>Select group</ThemedText>
            </Card>

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
        
            
        <GroupSelector 
          visible={modalVisible} 
          onClose={handleModalClose} 
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
  button: {
    margin: 0,
    marginVertical: 20,
    justifyContent: "center"
  }
});

export default ManualReminderScreen;