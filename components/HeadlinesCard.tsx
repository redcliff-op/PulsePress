import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useNewsProvider } from '@/providers/NewsProvider';

interface HeadLinesCardProps {
  item: NewsItem;
}

const HeadlinesCard = ({ item }: HeadLinesCardProps) => {
  const { setCurrentNews } = useNewsProvider();
  
  return (
    <Pressable
      onPress={() => {
        setCurrentNews(item);
        router.navigate('NewsView');
      }}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text
            style={styles.sourceName}
            numberOfLines={1}
          >
            {item.source.name}
          </Text>
          <Text
            style={styles.title}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={styles.date}
            numberOfLines={1}
          >
            {item.publishedAt?.substring(0, 10)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 20,
    marginVertical:5,
    justifyContent: 'space-between',
    flex: 1,
  },
  sourceName: {
    color: '#CDCACA', // Assuming text-gray-400 corresponds to this color
  },
  title: {
    color: 'white',
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'bold',
    flexShrink: 1,
  },
  date: {
    color: '#CDCACA', // Assuming text-gray-400 corresponds to this color
  },
});

export default HeadlinesCard;
