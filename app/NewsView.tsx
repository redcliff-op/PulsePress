import {Image,View, Text, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNewsProvider } from '@/providers/NewsProvider';
import { StatusBar } from 'expo-status-bar';
import RecommendedCard from '@/components/RecommendedCard';
import { Link, router } from 'expo-router';

const NewsView = () => {
  const { currentNews, recommended, fetchRecommended } = useNewsProvider();

  useEffect(() => {
    fetchRecommended(currentNews?.source.id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: currentNews?.urlToImage }}
        style={styles.image}
      />
      <View style={styles.newsDetailsContainer}>
        <ScrollView
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={styles.sourceBadge}>
            <Text style={styles.textWhite}>{currentNews?.source.name}</Text>
          </View>
          {currentNews?.author && (
            <View style={styles.authorBadge}>
              <Text style={styles.textWhite}>{currentNews?.author}</Text>
            </View>
          )}
          <View style={styles.dateBadge}>
            <Text style={styles.textWhite}>{currentNews?.publishedAt?.substring(0, 10)}</Text>
          </View>
        </ScrollView>
        <Text style={styles.title}>{currentNews?.title}</Text>
        <Text style={styles.content}>{currentNews?.content}</Text>
        <Pressable
          onPress={() => {
            router.navigate({
              pathname: '/NewsWebView',
              params: {
                newsUrl: currentNews?.url,
              },
            });
          }}
        >
          <Text style={styles.fullArticle}>Full Article</Text>
        </Pressable>
      </View>
      <Text style={styles.moreFrom}>{`More from ${currentNews?.source.name}`}</Text>
      <FlatList
        style={styles.recommendedList}
        horizontal={true}
        data={recommended}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <RecommendedCard newsData={item} />
        )}
      />
      <StatusBar animated={true} style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Assuming bg-background corresponds to a dark color
  },
  image: {
    width: '100%',
    height: '50%',
  },
  newsDetailsContainer: {
    backgroundColor: '#1a1a1a', // Assuming bg-background corresponds to a dark color
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  sourceBadge: {
    backgroundColor: '#2e2e2e', // Assuming bg-textFieldBackground corresponds to a specific color
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  authorBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: '#777', // Assuming border-gray-500 corresponds to a specific color
    borderWidth: 2,
    marginHorizontal: 10,
  },
  dateBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: '#777', // Assuming border-gray-500 corresponds to a specific color
    borderWidth: 2,
    marginHorizontal: 10,
  },
  textWhite: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold',
    marginTop: 20,
  },
  content: {
    color: '#ccc', // Assuming text-gray-100 corresponds to a specific color
    marginTop: 20,
  },
  fullArticle: {
    color: '#00f', // Assuming text-blue-400 corresponds to a specific color
  },
  moreFrom: {
    color: 'white',
    marginHorizontal: 20,
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendedList: {
    marginHorizontal: 20,
  },
});

export default NewsView;
