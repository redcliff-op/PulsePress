import { View, Text, Pressable, Button } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNewsProvider } from '@/providers/NewsProvider';

const index = () => {

  const {setUserInfo} = useNewsProvider()

  GoogleSignin.configure({
    webClientId: "231670128415-klq3tmg19mk9d0sjmpqeph1m0qihcq0m.apps.googleusercontent.com"
  });

  const checkIfAlreadySignedIn = async() => {
    const userInfo = await GoogleSignin.getCurrentUser()
    if(userInfo!==null){
      setUserInfo(userInfo.user)
      router.navigate(`/(tabs)`)
    }
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo.user)
      router.navigate(`/(tabs)`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    checkIfAlreadySignedIn()
  },[])

  return (
    <SafeAreaView className="flex-1 bg-background px-5 py-2 justify-center align-middle">
      <Text className='text-3xl text-white font-bold'>Welcome</Text>
      <Pressable
        onPress={()=>{
          signIn()
        }}
        className='mb-10 p-4 bg-sigYellow rounded-3xl items-center'>
        <Text className='font-bold text-lg'>
          Sign In
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default index