import { Image, View, Text, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useNewsProvider } from '@/providers/NewsProvider';
import { StatusBar } from 'expo-status-bar';
import RecommendedCard from '@/components/RecommendedCard';
import { Link, router, useFocusEffect } from 'expo-router';
import { DraggableScrollView } from '@/DraggableScrollView';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';

const NewsView = () => {
  const { currentNews, recommended, fetchRecommended } = useNewsProvider();

  useFocusEffect(
    useCallback(() => {
      fetchRecommended(currentNews?.source.id)
      return () => {
        fetchRecommended('clear')
      }
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        entering={FadeInUp}
        fadeDuration={800}
        source={{ uri: currentNews?.urlToImage }}
        style={styles.image}
      />
      <ScrollView style={styles.newsDetailsContainer} showsHorizontalScrollIndicator={false} snapToAlignment='start'>
        <View
          style={{ flexDirection: 'row' }}
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
        </View>
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
        {(recommended.length !== 0) ?
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Text style={styles.moreFrom}>{`More from ${currentNews?.source.name}`}</Text>
            <DraggableScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{}}
            >
              {recommended.map((item, index) => (
                <RecommendedCard
                  key={item.url}
                  newsData={item}
                />
              ))}
            </DraggableScrollView>
          </Animated.View>
          : <View></View>}
      </ScrollView>
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
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default NewsView;
