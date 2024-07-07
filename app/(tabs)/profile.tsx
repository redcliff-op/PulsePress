import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNewsProvider } from '@/providers/NewsProvider';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

const Profile = () => {
  const { fetchAllHeadlines, language, setLanguage, country, setCountry, fetchHeadlines, fetchTopHeadlines } = useNewsProvider();

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    fetchAllHeadlines("news", language, country);
  };

  const handleCountryChange = (country: string) => {
    setCountry(country);
    fetchAllHeadlines("news", language, country);
  };

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
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
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
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
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#161622',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  pickerContainer: {
    backgroundColor: '#283A4A',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  pickerItem: {
    backgroundColor: '#283A4A',
  }
});

export default Profile;
