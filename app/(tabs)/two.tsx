import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const two = () => {
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-background'>
      <View>
        <Text className='text-2xl font-bold text-white'>TWO</Text>
      </View>
    </SafeAreaView>
  )
}

export default two