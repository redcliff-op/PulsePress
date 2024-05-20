import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native-animatable'
import { useNewsProvider } from '@/providers/NewsProvider'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Link, router } from 'expo-router'

const profile = () => {

  const { userInfo, setUserInfo } = useNewsProvider()

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null)
      router.dismissAll()
    } catch(e){}
  };

  return (
    <SafeAreaView className='bg-background flex-1 px-5 py-2'>
      <View className='items-center flex-auto'>
        <View
          style={{
            width: 220,
            height: 220,
            borderRadius: 108,
            borderWidth: 4,
            borderColor: '#FFA001',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: userInfo?.photo?.toString() }}
            className='w-[200] h-[200] rounded-full m-2'
            resizeMode='cover'
          >
          </Image>
        </View>
        <View className='mt-3 mb-2'>
          <Text className='text-white text-2xl font-bold'>
            {userInfo?.name}
          </Text>
        </View>
        <Text className='text-white'>
          {userInfo?.email}
        </Text>
      </View>
      <Pressable
        onPress={()=>{
          signOut()
        }}
        className='mb-10 p-4 bg-sigYellow rounded-3xl items-center'>
        <Text className='font-bold text-lg'>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default profile