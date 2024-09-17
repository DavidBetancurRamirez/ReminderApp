import React, { PropsWithChildren } from 'react'
import { ThemedView } from './ThemedView'
import { Pressable } from 'react-native';

type Props = PropsWithChildren<{}>;

const Card = ({ children }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => ({
          opacity: pressed ? 0.6 : 1,  // Cambia la opacidad al ser presionado
      })}
    >
      <ThemedView 
        background={"card"} 
        style={{
          justifyContent: "space-between",
          flexDirection: 'row',
          alignItems: "center",
          borderRadius: 10,
          margin: 10
        }}
      >
          { children }
      </ThemedView>
    </Pressable>
  )
}

export default Card;