import { View, Text, Image, TextInput, FlatList, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import TopHeadlinesCard from '@/components/TopHeadlinesCard';
import { useNewsProvider } from '@/providers/NewsProvider';
import HeadlinesCard from '@/components/HeadlinesCard';

const Index = () => {
  const pfp = require('../../assets/images/pfp.jpg');
  const [search, setSearch] = useState('');
  const { topHeadlines, fetchTopHeadlines, headlines, fetchHeadlines, loading } = useNewsProvider()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("General")

  useEffect(() => {
    fetchTopHeadlines()
    fetchHeadlines(category)
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background px-5 py-2">
      <View className="flex-row justify-between align-middle">
        <Text className="text-white font-bold text-2xl">Search</Text>
        <Image source={pfp} className="w-[35] h-[35] rounded-3xl"></Image>
      </View>
      <Text className="text-white font-bold text-2xl">Your Daily News</Text>
      <View className="flex-row bg-textFieldBackground my-5 h-[50] rounded-2xl items-center px-5">
        <FontAwesome name="search" color={'white'} size={20} />
        <TextInput
          value={search}
          className="flex-1"
          onChangeText={setSearch}
          placeholder="Search"
          style={{ color: 'white', paddingHorizontal: 10 }}
          placeholderTextColor="white"
          keyboardType="web-search"
          multiline={false}
        />
      </View>
      <FlatList
        data={topHeadlines}
        className=' flex-initial mb-3'
        keyExtractor={(item) => item.url}
        renderItem={({ item, index }) => (
          item.urlToImage ?
            <TopHeadlinesCard
              newsData={item}
              index={index}
              currentIndex={currentIndex}
            /> : null
        )}
        showsHorizontalScrollIndicator={false}

        onViewableItemsChanged={(res) => {
          if (res.viewableItems.length) {
            setCurrentIndex(res.changed[0].index || 0)
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 150
        }}
        horizontal={true}
      />
      <ScrollView horizontal className='flex-initial' showsHorizontalScrollIndicator={false}>
        <Pressable
          onPress={() => {
            setCategory('General')
            fetchHeadlines('General')
          }}>
          <Text
            style={{ backgroundColor: (category === 'General') ? '#283A4A' : '#19212E' }}
            className='text-white font-bold text-xl mx-1 p-2 rounded-xl self-center'
          >
            General
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setCategory('Sports')
            fetchHeadlines('Sports')
          }}
        >
          <Text
            style={{ backgroundColor: (category === 'Sports') ? '#283A4A' : '#19212E' }}
            className='text-white font-bold text-xl mx-1 p-2 rounded-2xl self-center'
          >
            Sports
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setCategory('Technology')
            fetchHeadlines('Technology')
          }}>
          <Text
            style={{ backgroundColor: (category === 'Technology') ? '#283A4A' : '#19212E' }}
            className='text-white font-bold text-xl mx-1 p-2 rounded-2xl self-center'
          >
            Technology
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setCategory('Politics')
            fetchHeadlines('Politics')
          }}
        >
          <Text
            style={{ backgroundColor: (category === 'Politics') ? '#283A4A' : '#19212E' }}
            className='text-white font-bold text-xl mx-1 p-2 rounded-2xl self-center'
          >
            Politics
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setCategory('Entertainment')
            fetchHeadlines('Entertainment')
          }}>
          <Text
            style={{ backgroundColor: (category === 'Entertainment') ? '#283A4A' : '#19212E' }}
            className='text-white font-bold text-xl mx-1 p-2 rounded-2xl self-center'
          >
            Entertainment
          </Text>
        </Pressable>
      </ScrollView>
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={50} color="white" />
          </View>
        ) : (
          <FlatList
            data={headlines}
            className='flex-1'
            renderItem={({ item }) => {
              return (
                (item.urlToImage) ?
                  <HeadlinesCard
                    item={item}
                  /> : null
              )
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;