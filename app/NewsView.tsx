import { Image, View, Text, Pressable, SafeAreaView, StyleSheet, Animated as RNAnimated, FlatList, Alert, ScrollView } from 'react-native';
import React, { useCallback } from 'react';
import { useNewsProvider } from '@/providers/NewsProvider';
import { useFocusEffect } from 'expo-router';
import HeadlinesCard from '@/components/HeadlinesCard';
import TopHeadLinesCard from '@/components/TopHeadlinesCard';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';

const NewsView = () => {
  const { currentNews, recommended, fetchRecommended, savedNews, handleSaveNote } = useNewsProvider();

  useFocusEffect(
    useCallback(() => {
      fetchRecommended(currentNews?.source.id)
      return () => {
        fetchRecommended('clear')
      }
    }, [])
  );

  const isSaved = savedNews.findIndex((p) => p.url.toString() === currentNews?.url.toString()) !== -1

  return (
    <View style={{ flex: 1, backgroundColor: '#161622', padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Animated.View entering={FadeInLeft} style={{ flexDirection: 'row' }}>
          <View style={{ margin: 5, padding: 15, borderRadius: 20, backgroundColor: '#283A4A', flexDirection: 'row' }}
          >
            <Image tintColor={'#FFA001'} source={require('../assets/images/authoricon.png')} style={{ width: 20, height: 20, marginRight: 10 }}></Image>
            <Text style={{ fontSize: 15, color: 'white', fontWeight: 'semibold' }}>{currentNews?.author}</Text>
          </View>
          <View style={{ margin: 5, padding: 15, borderRadius: 20, backgroundColor: '#283A4A', flexDirection: 'row' }}
          >
            <Text style={{ fontSize: 15, color: 'white', fontWeight: 'semibold' }}>{currentNews?.source.name}</Text>
          </View>
          <View style={{ margin: 5, padding: 15, borderRadius: 20, backgroundColor: '#283A4A', flexDirection: 'row' }}
          >
            <Text style={{ fontSize: 15, color: 'white', fontWeight: 'semibold' }}>{currentNews?.publishedAt.substring(0, 10)}</Text>
          </View>
        </Animated.View>
        <Animated.View entering={FadeInRight}>
          <Pressable
            onPress={() => {
              handleSaveNote(currentNews)
            }}
            style={{ margin: 5, padding: 15, borderRadius: 20, backgroundColor: (isSaved) ? '#FFA001' : '#283A4A', flexDirection: 'row' }}
          >
            <Text style={{ fontSize: 15, color: (isSaved) ? 'black' : 'white', fontWeight: 'bold' }}>{(isSaved) ? 'Unsave Article' : 'Save Article'}</Text>
          </Pressable>
        </Animated.View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 15 }}>
        <Animated.View style={{ flex: 0.3 }} entering={FadeInDown}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 45, fontWeight: 'bold', color: 'white', marginBottom: 50 }}>{currentNews?.title}</Text>
            <Text style={{ fontSize: 25, color: '#CDCACA', marginBottom: 50 }}>{currentNews?.description}</Text>
            <Text style={{ fontSize: 25, color: 'gray' }}>{currentNews?.content}</Text>
            <Pressable
              onPress={()=>{
                window.open(currentNews?.url,'_blank')
              }}
              style={{ backgroundColor: '#FFA001', padding: 20, borderRadius: 20, marginTop: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', color: 'black' }}>Full Article</Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
        <Animated.Image entering={FadeInUp} style={{ flex: 0.4, marginHorizontal: 20, borderRadius: 20 }} source={{ uri: currentNews?.urlToImage }}></Animated.Image>
        <Animated.View entering={FadeInDown} style={{ flex: 0.3, backgroundColor: '#283A4A', padding: 15, borderRadius: 20 }}>
          <FlatList
            data={recommended}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              (item.title !== '[Removed]' && item.source.name !== 'NPR') ?
                (index === 0) ?
                  <TopHeadLinesCard newsData={item} style={{ margin: -5, marginBottom: 5 }} />
                  : <HeadlinesCard item={item} /> : null
            }
          />
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default NewsView;
