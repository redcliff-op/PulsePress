import { View, Text, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';
import { useNewsProvider } from '@/providers/NewsProvider';

interface TopHeadLinesCardProps {
  newsData: NewsItem;
  index: number;
  currentIndex: number;
}

const zoomIn = {
  0: {
    scale: 0.8,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.8,
  },
};

const TopHeadLinesCard = ({ newsData, index, currentIndex }: TopHeadLinesCardProps) => {
  const animationType = index === currentIndex ? zoomIn : zoomOut;
  const { setCurrentNews, updateSavedNews, savedNews } = useNewsProvider()
  return (
    <Pressable
      onPress={() => {
        setCurrentNews(newsData)
        router.navigate('NewsView')
      }
      }>
      <Animatable.View
        animation={animationType}
        duration={300}
        style={{ elevation: index === currentIndex ? 5 : 2 }}
      >
        <ImageBackground
          source={{ uri: newsData.urlToImage }}
          className="w-[250] h-[200] justify-center shadow-lg shadow-black/40"
          resizeMode="cover"
          blurRadius={40}
          borderRadius={20}
        >
          <View className='flex-1 justify-between m-5 flex-shrink-1'>
            <View className='flex-row  justify-between'>
              <Text className="flex-auto text-white text-start font-bold overflow-ellipsis" numberOfLines={1}>
                {newsData.source.name}
              </Text>
              <Pressable
                onPress={() => {
                  updateSavedNews(newsData)
                }}
              >
                <Animatable.Image
                  source={require('../assets/icons/bookmark.png')}
                  className='w-[20] h-[20]'
                  tintColor={(savedNews.findIndex((p) => p.url.toString() === newsData.url.toString()) !== -1) ? '#FFA001' : 'white'}
                />
              </Pressable>
            </View>
            <Text className="text-white text-start text-lg font-bold" numberOfLines={2}>
              {newsData.title}
            </Text>
            <View className='flex-row justify-between flex-wrap'>
              <Text className="text-white text-start font-bold flex-auto mr-3" numberOfLines={1}>
                {newsData.author}
              </Text>
              <Text
                className="text-white font-bold flex-auto"
                numberOfLines={1}
              >
                {newsData.publishedAt?.substring(0, 10)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Animatable.View>
    </Pressable>
  );
};

export default TopHeadLinesCard;