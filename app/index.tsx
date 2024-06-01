import { Text, Pressable, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNewsProvider } from '@/providers/NewsProvider';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';

const index = () => {

  const { setUserInfo, setSavedNews, setLanguage, setCountry } = useNewsProvider()

  GoogleSignin.configure({
    webClientId: "231670128415-klq3tmg19mk9d0sjmpqeph1m0qihcq0m.apps.googleusercontent.com"
  });

  const checkIfAlreadySignedIn = async () => {
    const userInfo = await GoogleSignin.getCurrentUser()
    if (userInfo !== null) {
      setUserInfo(userInfo.user)
      const userRef = firestore().collection('Users').doc(userInfo.user.email);
      const userSnapshot = await userRef.get()
      const userData = userSnapshot.data()
      if (userData && userData.savedNews) {
        setSavedNews(userData.savedNews)
        setLanguage(userData.language)
        setCountry(userData.country)
      }
      router.navigate(`/(tabs)`)
    }
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo.user)
      const userRef = firestore().collection('Users').doc(userInfo.user.email);
      const userSnapshot = await userRef.get()
      if (!userSnapshot.exists) {
        userRef.set({
          name: userInfo.user.name,
          savedNews: [],
          language: "en",
          country: "in"
        })
        setLanguage("en")
        setCountry("in")
      } else {
        const userData = userSnapshot.data()
        if (userData) {
          setSavedNews(userData.savedNews)
          setLanguage(userData.language)
          setCountry(userData.country)
        }
      }
      router.navigate(`/(tabs)`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfAlreadySignedIn()
  }, [])

  const animation = useRef(null);

  return (
    <SafeAreaView className="flex-1 bg-background px-5 py-2 justify-between items-center">
      <View className='mt-10'>
        <Text className='text-white text-3xl text-center'>
          The <Text className='text-white text-3xl font-bold'>Pulse</Text>
        </Text>
        <Text className='text-white text-3xl'>
          of the <Text className='text-white text-3xl font-bold'>Planet!</Text>
        </Text>
      </View>
      <LottieView
        ref={animation}
        autoPlay
        style={{
          width: '130%',
          height: '50%'
        }}
        source={require('../assets/raw/onboarding.json')}
      />
      <Text className='text-white text-xl'>
        Stay informed, stay ahead Get the latest news from around the world!
      </Text>
      <Pressable
        onPress={() => {
          signIn()
        }}
        className='mb-10 p-4 bg-sigYellow rounded-3xl items-center self-stretch'>
        <View className='flex-row items-center'>
          <Image
            source={require('../assets/icons/google.png')}
            className='w-[20] h-[20] mr-2'
            tintColor={'black'}
          />
          <Text className='font-bold text-lg'>
            Sign In
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default index