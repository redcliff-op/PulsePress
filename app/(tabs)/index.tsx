import { View, Text, Image, TextInput, FlatList, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import TopHeadlinesCard from '@/components/TopHeadlinesCard';
import { useNewsProvider } from '@/providers/NewsProvider';
import HeadlinesCard from '@/components/HeadlinesCard';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Link, router } from 'expo-router';

const Index = () => {
  const [search, setSearch] = useState('');
  const { topHeadlines, fetchTopHeadlines, headlines, fetchHeadlines, userInfo, loading, setLoading } = useNewsProvider()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("General")

  useEffect(() => {
    fetchTopHeadlines()
    fetchHeadlines(category)
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background px-5 py-2">
      <View className="flex-row justify-between align-middle">
        <Text className="text-white font-bold text-2xl flex-auto">Search</Text>
        <Animated.Image
          source={{ uri: userInfo?.photo?.toString() }}
          className="w-[35] h-[35] rounded-3xl"
        />
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
          multiline={false}
          onSubmitEditing={() => {
            fetchHeadlines(search)
            setCategory("")
          }}
        />
      </View>
      <FlatList
        data={topHeadlines}
        className=' flex-initial mb-5'
        keyExtractor={(item) => item.id.toString()}
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
          itemVisiblePercentThreshold: 300
        }}
        horizontal={true}
      />
      <ScrollView horizontal className='flex-initial mb-2' showsHorizontalScrollIndicator={false}>
        <Pressable
          className='flex-auto'
          onPress={() => {
            setCategory('General')
            fetchHeadlines('General')
            setLoading(true)
          }}>
          <Text
            style={{ backgroundColor: (category === 'General') ? '#283A4A' : '#161622' }}
            className='text-white font-bold text-base mx-1 p-2 rounded-xl self-center flex-auto'
          >
            General
          </Text>
        </Pressable>
        <Pressable
          className='flex-auto'
          onPress={() => {
            setCategory('Sports')
            fetchHeadlines('Sports')
            setLoading(true)
          }}
        >
          <Text
            style={{ backgroundColor: (category === 'Sports') ? '#283A4A' : '#161622' }}
            className='text-white font-bold text-base mx-1 p-2 rounded-2xl self-center flex-auto'
          >
            Sports
          </Text>
        </Pressable>
        <Pressable
          className='flex-auto'
          onPress={() => {
            setCategory('Technology')
            fetchHeadlines('Technology')
            setLoading(true)
          }}>
          <Text
            style={{ backgroundColor: (category === 'Technology') ? '#283A4A' : '#161622' }}
            className='text-white font-bold text-base mx-1 p-2 rounded-2xl self-center flex-auto'
          >
            Technology
          </Text>
        </Pressable>
        <Pressable
          className='flex-auto'
          onPress={() => {
            setCategory('Politics')
            fetchHeadlines('Politics')
            setLoading(true)
          }}
        >
          <Text
            style={{ backgroundColor: (category === 'Politics') ? '#283A4A' : '#161622' }}
            className='text-white font-bold text-base mx-1 p-2 rounded-2xl self-center flex-auto'
          >
            Politics
          </Text>
        </Pressable>
        <Pressable
          className='flex-auto'
          onPress={() => {
            setCategory('Entertainment')
            fetchHeadlines('Entertainment')
            setLoading(true)
          }}>
          <Text
            style={{ backgroundColor: (category === 'Entertainment') ? '#283A4A' : '#161622' }}
            className='text-white font-bold text-base mx-1 p-2 rounded-2xl self-center flex-auto'
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
            className='flex-initial'
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

export default Index