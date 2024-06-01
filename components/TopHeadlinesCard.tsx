import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { useNewsProvider } from '@/providers/NewsProvider';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface TopHeadLinesCardProps {
  newsData: NewsItem;
  index: number;
  currentIndex: number;
}

const TopHeadLinesCard = ({ newsData, index, currentIndex }: TopHeadLinesCardProps) => {
  const { setCurrentNews, updateSavedNews, savedNews } = useNewsProvider()

  const scale = useSharedValue(index === currentIndex ? 1 : 0.85);

  useEffect(() => {
    if (index === currentIndex) {
      scale.value = withTiming(1, { duration: 300 });
    } else {
      scale.value = withTiming(0.85, { duration: 300 });
    }
  }, [currentIndex, index, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      elevation: index === currentIndex ? 5 : 2,
    };
  });

  return (
    <Pressable
      onPress={() => {
        setCurrentNews(newsData)
        router.navigate('NewsView')
      }
      }>
      <Animated.View
        style={[animatedStyle]}
      >
        <ImageBackground
          source={newsData.urlToImage?{uri: newsData.urlToImage}:require('../assets/images/NoImage.jpg')}
          className="w-[250] h-[200] justify-center shadow-lg shadow-black/40"
          resizeMode="cover"
          blurRadius={40}
          borderRadius={20}
        >
          <View className='flex-1 justify-between m-5 flex-shrink-1'>
            <View className='flex-row  justify-between'>
              <Text className="flex-auto text-white text-start font-bold overflow-ellipsis" numberOfLines={1}>
                {newsData.sourceName}
              </Text>
              <Pressable
                onPress={() => {
                  updateSavedNews(newsData)
                }}
              >
                <Animated.Image
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
      </Animated.View>
    </Pressable>
  );
};

export default TopHeadLinesCard;