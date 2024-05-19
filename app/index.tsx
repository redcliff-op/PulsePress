import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView className="flex-1 bg-background px-5 py-2 justify-center items-center">
      <Link href={`/(tabs)`}>
        <Text className='text-3xl text-white font-bold'>Welcome</Text>
      </Link>
    </SafeAreaView>
  )
}

export default index