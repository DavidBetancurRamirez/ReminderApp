import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadCSVScreen = () => {
  const handleCSVUpload = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });
      console.log(result)
      // if (result.type === 'success') {
      //   console.log('CSV file uploaded:', result.uri);
      //   // Handle file processing here
      // } else {
      //   console.log('Document picking was canceled');
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps to upload your CSV file</Text>
      <Text style={styles.step}>1. Set up your columns</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handleCSVUpload}>
        <Text style={styles.uploadButtonText}>Upload CSV File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  step: {
    fontSize: 16,
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default UploadCSVScreen;