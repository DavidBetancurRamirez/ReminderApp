import React, { PropsWithChildren } from 'react'
import { ThemedView } from './ThemedView'
import { TouchableOpacity } from 'react-native';

type Props = PropsWithChildren<{}>;

const Card = ({ children }: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.6}>
            <ThemedView 
                background={"card"} 
                style={{
                    justifyContent: "space-between",
                    flexDirection: 'row',
                    alignItems: "center",
                    borderRadius: 10
                }}
            >
                { children }
            </ThemedView>
        </TouchableOpacity>
    )
}

export default Card;