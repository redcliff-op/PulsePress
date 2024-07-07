import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNewsProvider } from '@/providers/NewsProvider';

interface TopHeadLinesCardProps {
  newsData: NewsItem;
}

const TopHeadLinesCard = ({ newsData }: TopHeadLinesCardProps) => {
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
          blurRadius={40}
          borderRadius={20}
          imageStyle={{opacity:0.7}}
        >
          <View style={styles.textContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.sourceName} numberOfLines={1}>
                {newsData.source.name}
              </Text>
              <Ionicons name='bookmark-outline' size={25} color={'white'} />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {newsData.title}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.author} numberOfLines={1}>
                {newsData.author}
              </Text>
              <Text style={styles.publishedAt} numberOfLines={1}>
                {newsData.publishedAt?.substring(0, 10)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    padding:5
  },
  imageBackground: {
    width: 250,
    height: 200,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 20,
    overflow: 'hidden',
    padding:5
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceName: {
    color: 'white',
    flex: 1,
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'left',
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontSize: 20, // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'left',
  },
  author: {
    color: 'white',
    flex: 1,
    fontSize: 14, // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'left',
    marginRight: 10,
  },
  publishedAt: {
    color: 'white',
    fontSize: 14, // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default TopHeadLinesCard;
