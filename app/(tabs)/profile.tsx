import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNewsProvider } from '@/providers/NewsProvider';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

const profile = () => {
  const { fetchAllHeadlines, userInfo, setUserInfo, language, setLanguage, country, setCountry, fetchHeadlines, fetchTopHeadlines } = useNewsProvider();

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      router.dismissAll();
    } catch (e) { }
  };

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    fetchAllHeadlines("news", language, country)
    const userRef = firestore().collection('Users').doc(userInfo?.email);
    userRef.update({
      language: language
    })
  };

  const handleCountryChange = (country: string) => {
    setCountry(country)
    fetchAllHeadlines("news", language, country)
    const userRef = firestore().collection('Users').doc(userInfo?.email);
    userRef.update({
      country: country
    })
  }

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "de", name: "German" },
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "he", name: "Hebrew" },
    { code: "it", name: "Italian" },
    { code: "nl", name: "Dutch" },
    { code: "no", name: "Norwegian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "sv", name: "Swedish" },
    { code: "ud", name: "Urdu" },
    { code: "zh", name: "Chinese" }
  ];

  const countries = [
    { code: "ae", name: "United Arab Emirates" },
    { code: "bg", name: "Bulgaria" },
    { code: "br", name: "Brazil" },
    { code: "ch", name: "Switzerland" },
    { code: "cn", name: "China" },
    { code: "de", name: "Germany" },
    { code: "eg", name: "Egypt" },
    { code: "fr", name: "France" },
    { code: "gb", name: "United Kingdom" },
    { code: "gr", name: "Greece" },
    { code: "hk", name: "Hong Kong" },
    { code: "id", name: "Indonesia" },
    { code: "in", name: "India" },
    { code: "it", name: "Italy" },
    { code: "jp", name: "Japan" },
    { code: "kr", name: "South Korea" },
    { code: "lv", name: "Latvia" },
    { code: "ma", name: "Morocco" },
    { code: "mx", name: "Mexico" },
    { code: "my", name: "Malaysia" },
    { code: "ng", name: "Nigeria" },
    { code: "nl", name: "Netherlands" },
    { code: "no", name: "Norway" },
    { code: "ph", name: "Philippines" },
    { code: "pl", name: "Poland" },
    { code: "pt", name: "Portugal" },
    { code: "ru", name: "Russia" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "sg", name: "Singapore" },
    { code: "si", name: "Slovenia" },
    { code: "sk", name: "Slovakia" },
    { code: "th", name: "Thailand" },
    { code: "tr", name: "Turkey" },
    { code: "tw", name: "Taiwan" },
    { code: "ua", name: "Ukraine" },
    { code: "us", name: "United States" },
    { code: "ve", name: "Venezuela" },
    { code: "za", name: "South Africa" }
  ];

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
          <Animated.Image
            source={{ uri: userInfo?.photo?.toString() }}
            className='w-[200] h-[200] rounded-full m-2'
            resizeMode='cover'
            entering={FadeIn}
          />
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
      <View className='flex-1 justify-evenly'>
        <View
          className='bg-textFieldBackground py-2 px-3 rounded-full'>
          <Picker
            selectionColor={'#FFA001'}
            dropdownIconColor={'#FFA001'}
            dropdownIconRippleColor={'#FFA001'}
            selectedValue={language}
            onValueChange={handleLanguageChange}
            mode='dropdown'
          >
            {languages.map((language) => (
              <Picker.Item
                label={language.name}
                value={language.code}
                key={language.code}
                color='#FFA001'
                style={{backgroundColor:'#283A4A'}}
              />
            ))}
          </Picker>
        </View>
        <View
          className='bg-textFieldBackground py-2 px-3 rounded-full'>
          <Picker
            selectedValue={country}
            onValueChange={handleCountryChange}
            selectionColor={'#FFA001'}
            dropdownIconColor={'#FFA001'}
            dropdownIconRippleColor={'#FFA001'}
            mode='dropdown'
          >
            {countries.map((country) => (
              <Picker.Item
                label={country.name}
                value={country.code}
                key={country.code}
                color='#FFA001'
                style={{backgroundColor:'#283A4A'}}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Pressable
        onPress={signOut}
        className='mb-10 p-4 bg-sigYellow rounded-3xl items-center'>
        <Text className='font-bold text-lg'>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default profile;
