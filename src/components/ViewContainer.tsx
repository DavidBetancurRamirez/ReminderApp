import React from 'react'
import { useThemeColor } from '../hooks/useThemeColor';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

const ViewContainer = ({ children }: SafeAreaViewProps) => {
  const backgroundColor = useThemeColor("background");

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor
    }}>
      {children}
    </SafeAreaView>
  )
}

export default ViewContainer