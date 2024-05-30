import { Image, Text, View, FlatList, Pressable, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { useNewsProvider } from '@/providers/NewsProvider'
import { StatusBar } from 'expo-status-bar'
import RecommendedCard from '@/components/RecommendedCard'
import { router, useFocusEffect } from 'expo-router'
import { Share } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'

const NewsView = () => {

  const { currentNews, recommended, fetchRecommended, updateSavedNews, savedNews } = useNewsProvider()

  useFocusEffect(
    useCallback(() => {
      fetchRecommended(currentNews?.sourceId)
      return () => {
        fetchRecommended('clear')
      }
    }, [])
  );

  const shareArticle = async (url: string) => {
    await Share.share({
      message: `Check out this article: ${url}`,
      url: url,
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Animated.Image
        source={{ uri: currentNews?.urlToImage }}
        className='w-[100%] h-[30%]'
        entering={FadeInUp}
      />
      <View
        className='bg-background rounded-t-3xl -mt-5 p-5'
      >
        <ScrollView
          snapToAlignment='start'
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View className='bg-textFieldBackground self-start px-3 py-1 rounded-xl mr-2'>
            <Text
              className='text-white'
            >{currentNews?.sourceName}</Text>
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
      {recommended.length !== 0 ? (
        <Animated.View
          className='flex-1'
          entering={FadeIn}
          exiting={FadeOut} 
        >
          <Text className='text-white mx-5 text-xl font-bold mb-2'>
            More from {currentNews?.sourceName}
          </Text><FlatList
            className='mx-3'
            horizontal={true}
            data={recommended}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => {
              return (
                <RecommendedCard
                  newsData={item} />
              )
            }} />
        </Animated.View>
      ) : (
        <View className='flex-1'></View>
      )}
      <View className='flex-row px-5 py-2'>
        <Pressable
          className='flex-auto pr-1'
          onPress={() => {
            currentNews ?
              updateSavedNews(currentNews) : null
          }}
        >
          <Animated.View
            className='justify-center items-center h-[50] bg-sigYellow rounded-2xl flex-row'
            entering={FadeInDown}
          >
            <Image
              source={require('../assets/icons/bookmark.png')}
              className='w-[20] h-[20] mr-2'
              tintColor={'black'}
            />
            <Text className='text-lg font-bold'>
              {(savedNews.findIndex((p) => p.url.toString() === currentNews?.url.toString()) !== -1) ? 'Unsave' : 'Save Article'}
            </Text>
          </Animated.View>
        </Pressable>
        <Pressable
          className='flex-auto pl-1'
          onPress={() => {
            shareArticle(currentNews?.url!!)
          }}
        >
          <Animated.View
            className='justify-center flex-row items-center h-[50] bg-sigYellow rounded-2xl'
            entering={FadeInDown}
          >
            <Image
              source={require('../assets/icons/share.png')}
              className='w-[20] h-[20] mr-2'
              tintColor={'black'}
            />
            <Text className='text-lg font-bold'>
              Share
            </Text>
          </Animated.View>
        </Pressable>
      </View>
      <StatusBar animated={true} style='dark' />
    </SafeAreaView>
  )
}

export default NewsView