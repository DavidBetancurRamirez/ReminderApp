import React, { useRef } from 'react'
import { ThemedView } from './Theme/ThemedView'
import { Pressable, Animated, StyleSheet, type ViewProps, GestureResponderEvent } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps extends ViewProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({ children, style, onPress, ...rest }) => {
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
      onPress={onPress}
      style={{ transform: [{ scale }] }}
    >
      <ThemedView 
        background={"card"} 
        style={[styles.card, style]}
        {...rest}
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
  },
});

export default Card;