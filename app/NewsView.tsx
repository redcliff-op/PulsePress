import { FlatList, Pressable, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNewsProvider } from '@/providers/NewsProvider'
import { Image, Text, View, } from 'react-native-animatable'
import { StatusBar } from 'expo-status-bar'
import RecommendedCard from '@/components/RecommendedCard'
import { Link, router } from 'expo-router'

const NewsView = () => {

  const { currentNews, recommended, fetchRecommended } = useNewsProvider()

  useEffect(() => {
    fetchRecommended(currentNews?.source.id)
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Image
        source={{ uri: currentNews?.urlToImage }}
        width={'100%'}
        height={'30%'}
      >
      </Image>
      <View className='bg-background rounded-t-3xl -mt-5 p-5'>
        <ScrollView
          snapToAlignment='start'
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View className='bg-textFieldBackground self-start px-3 py-1 rounded-xl mr-2'>
            <Text
              className='text-white'
            >{currentNews?.source.name}</Text>
          </View>
          {currentNews?.author && (
            <View className='self-start px-3 py-1 rounded-xl border-gray-500 border-2 mx-2'>
              <Text
                className='text-white'
              >{currentNews?.author}</Text>
            </View>
          )}
          <View className='self-start px-3 py-1 rounded-xl border-gray-500 border-2 mx-2'>
            <Text
              className='text-white'
            >{currentNews?.publishedAt?.substring(0, 10)}</Text>
          </View>
        </ScrollView>
        <Text
          className='text-white text-xl font-bold mt-5'>
          {currentNews?.title}
        </Text>
        <Text
          className='text-gray-100 mt-5'>
          {currentNews?.content}
        </Text>
        <Pressable
          onPress={() => {
            router.navigate({
              pathname: '/NewsWebView',
              params: {
                newsUrl: currentNews?.url
              }
            })
          }}>
          <Text className='text-blue-400'>
            Full Article
          </Text>
        </Pressable>
      </View>
      <Text className='text-white mx-5 text-xl font-bold mb-2'>
        More from {currentNews?.source.name}
      </Text>
      <FlatList
        className='mx-3'
        horizontal={true}
        data={recommended}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          return (
            <RecommendedCard
              newsData={item}
            />
          )
        }}
      ></FlatList>
      <StatusBar animated={true} style='dark' />
    </SafeAreaView>
  )
}

export default NewsView