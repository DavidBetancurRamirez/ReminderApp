import { StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

const Statistics = () => {
  return (
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Statistics!</ThemedText>
    </ThemedView> 
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default Statistics;