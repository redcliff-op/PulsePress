import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useNewsProvider } from '@/providers/NewsProvider'
import Animated from 'react-native-reanimated'

interface HeadLinesCardProps {
  item: NewsItem
}

const HeadlinesCard = ({ item }: HeadLinesCardProps) => {
  const { setCurrentNews } = useNewsProvider()
  return (
    <Pressable
      onPress={() => {
        setCurrentNews(item)
        router.navigate('NewsView')
      }
      }>
      <View className='flex-row py-3'>
        <Animated.Image
          source={{ uri: item.urlToImage }}
          width={90}
          height={90}
          borderRadius={20}
        />
        <View className='mx-5 justify-between flex-auto'>
          <Text
            className='text-gray-400'
            numberOfLines={1}
          >
            {item.sourceName}
          </Text>
          <Text
            className='text-white text-base font-bold flex-auto'
            numberOfLines={2}
            style={{flexShrink:1}}
          >
            {item.title}
          </Text>
          <Text
            className='text-gray-400 flex-auto'
            numberOfLines={1}
          >
            {item.publishedAt?.substring(0, 10)}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default HeadlinesCard