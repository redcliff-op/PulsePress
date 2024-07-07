import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useNewsProvider } from '@/providers/NewsProvider';

interface RecommendedCardProps {
  newsData: NewsItem;
}

const RecommendedCard = ({ newsData }: RecommendedCardProps) => {
  const { setCurrentNews } = useNewsProvider();

  return (
    <Pressable
      onPress={() => {
        setCurrentNews(newsData);
        router.navigate('NewsView');
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: newsData.urlToImage }}
          style={styles.imageBackground}
          resizeMode="cover"
          blurRadius={5}
          borderRadius={20}
          imageStyle={{opacity:0.5}}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={5}>
              {newsData.title}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  imageBackground: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default RecommendedCard;
