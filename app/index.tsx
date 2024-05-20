import { Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNewsProvider } from '@/providers/NewsProvider';
import firestore from '@react-native-firebase/firestore';

const index = () => {

  const { setUserInfo, setSavedNews } = useNewsProvider()

  GoogleSignin.configure({
    webClientId: "231670128415-klq3tmg19mk9d0sjmpqeph1m0qihcq0m.apps.googleusercontent.com"
  });

  const checkIfAlreadySignedIn = async () => {
    const userInfo = await GoogleSignin.getCurrentUser()
    if (userInfo !== null) {
      setUserInfo(userInfo.user)
      router.navigate(`/(tabs)`)
      const userRef = firestore().collection('Users').doc(userInfo.user.email);
      const userSnapshot = await userRef.get()
      const userData = userSnapshot.data()
      if (userData && userData.savedNews) {
        setSavedNews(userData.savedNews)
      }
    }
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo.user)
      router.navigate(`/(tabs)`)
      const userRef = firestore().collection('Users').doc(userInfo.user.email);
      const userSnapshot = await userRef.get()
      if (!userSnapshot.exists) {
        userRef.set({
          name: userInfo.user.name,
          savedNews: []
        })
      } else {
        const userData = userSnapshot.data()
        if (userData && userData.savedNews) {
          setSavedNews(userData.savedNews)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfAlreadySignedIn()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background px-5 py-2 justify-center align-middle">
      <Text className='text-3xl text-white font-bold'>Welcome</Text>
      <Pressable
        onPress={() => {
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