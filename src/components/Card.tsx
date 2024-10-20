import React, { PropsWithChildren, useRef } from 'react'
import { ThemedView } from './ThemedView'
import { Pressable, Animated, Text, StyleSheet } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Card = ({ children }: PropsWithChildren<{}>) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{ transform: [{ scale }] }}
    >
      <ThemedView 
        background={"card"} 
        style={styles.card}
      >
        { children }
      </ThemedView>
    </AnimatedPressable>
  )
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 15,
    padding: 5,
    margin: 10,
  },
});

export default Card;