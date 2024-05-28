import { View, Text, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useNewsProvider } from '@/providers/NewsProvider';
import Animated from 'react-native-reanimated';

interface RecommendedCard {
  newsData: NewsItem;
}

const RecommendedCard = ({ newsData }: RecommendedCard) => {
  const {setCurrentNews} = useNewsProvider()
  return (
    <Pressable
      onPress={() => {
        setCurrentNews(newsData)
        router.navigate('NewsView')
      }
      }>
      <Animated.View
        className="mx-2"
      >
        <ImageBackground
          source={{ uri: newsData.urlToImage }}
          className="w-[150] h-[150] justify-center shadow-lg shadow-black/40"
          resizeMode="cover"
          blurRadius={70}
          borderRadius={20}
          
        >
          <View className='flex-1 justify-center m-3 flex-shrink-1'>
            <Text className="text-white text-start font-bold" numberOfLines={5}>
              {newsData.title}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

export default RecommendedCard;