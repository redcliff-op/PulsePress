import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable'
import { router } from 'expo-router'
import { useNewsProvider } from '@/providers/NewsProvider'

interface HeadLinesCardProps {
  item: NewsItem
}

const HeadlinesCard = ({ item }: HeadLinesCardProps) => {
  const {setCurrentNews} = useNewsProvider()
  return (
    <Pressable
      onPress={() => {
        setCurrentNews(item)
        router.navigate('NewsView')
      }
      }>
      <View className='flex-row my-3'>
        <Image
          source={{ uri: item.urlToImage }}
          width={100}
          height={100}
          borderRadius={20}
        />
        <View className='mx-5 justify-between'>
          <Text
            className='text-white overflow-ellipsis'
            numberOfLines={2}
          >
            {item.source.name}
          </Text>
          <Text
            className='text-white text-lg font-bold overflow-ellipsis'
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <View className='flex-row'>
            <Text
              className='text-white overflow-ellipsis'
              numberOfLines={1}
            >
              {item.author}
            </Text>
            {/* <Text
            className='text-white overflow-ellipsis'
            numberOfLines={1}
          >
            {item.publishedAt?.substring(0,10)}
          </Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default HeadlinesCard