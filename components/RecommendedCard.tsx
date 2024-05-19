import { View, Text, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNewsProvider } from '@/providers/NewsProvider';

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
      <Animatable.View
        className="mx-2"
        duration={300}
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
      </Animatable.View>
    </Pressable>
  );
};

export default RecommendedCard;