import { StyleSheet } from 'react-native';

import ViewContainer from '@/src/components/ViewContainer';
import { ThemedText } from '../../components/Theme/ThemedText';
import { ThemedView } from '../../components/Theme/ThemedView';

const Statistics = () => {
  return (
    <ViewContainer>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" textColor='notification'>Statistics!</ThemedText>
      </ThemedView> 
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default Statistics;