import { FlatList, Pressable, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNewsProvider } from '@/providers/NewsProvider'
import { Image, Text, View, } from 'react-native-animatable'
import { StatusBar } from 'expo-status-bar'
import RecommendedCard from '@/components/RecommendedCard'
import { router } from 'expo-router'
import { Share } from 'react-native';

const NewsView = () => {

  const { currentNews, recommended, fetchRecommended, updateSavedNews, savedNews } = useNewsProvider()

  useEffect(() => {
    fetchRecommended(currentNews?.source.id)
  }, [])

  const shareArticle = async (url: string) => {
    await Share.share({
      message: `Check out this article: ${url}`,
      url: url,
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Image
        source={{ uri: currentNews?.urlToImage }}
        className='w-[100%] h-[30%]'
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
      <View className='flex-row px-5 py-2'>
        <Pressable
          className='flex-auto pr-1'
          onPress={() => {
            currentNews ?
              updateSavedNews(currentNews) : null
          }}
        >
          <View
            className='justify-center items-center h-[50] bg-sigYellow rounded-2xl flex-row'
            animation={'bounce'}
          >
            <Image
              source={require('../assets/icons/bookmark.png')}
              className='w-[20] h-[20] mr-2'
              tintColor={'black'}
            />
            <Text className='text-lg font-bold'>
              {(savedNews.findIndex((p) => p.url.toString() === currentNews?.url.toString()) !== -1) ? 'Unsave' : 'Save Article'}
            </Text>
          </View>
        </Pressable>
        <Pressable
          className='flex-auto pl-1'
          onPress={() => {
            shareArticle(currentNews?.url)
          }}
        >
          <View
            className='justify-center flex-row items-center h-[50] bg-sigYellow rounded-2xl'
            animation={'bounce'}
          >
            <Image
              source={require('../assets/icons/share.png')}
              className='w-[20] h-[20] mr-2'
              tintColor={'black'}
            />
            <Text className='text-lg font-bold'>
              Share
            </Text>
          </View>
        </Pressable>
      </View>
      <StatusBar animated={true} style='dark' />
    </SafeAreaView>
  )
}

export default NewsView