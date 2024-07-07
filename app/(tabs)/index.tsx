import { View, Text, Image, TextInput, FlatList, ScrollView, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import TopHeadlinesCard from '@/components/TopHeadlinesCard';
import { useNewsProvider } from '@/providers/NewsProvider';
import HeadlinesCard from '@/components/HeadlinesCard';
import { DraggableScrollView } from '../../DraggableScrollView'

const Index = () => {
  const pfp = require('../../assets/images/pfp.jpg');
  const [search, setSearch] = useState('');
  const { topHeadlines, fetchTopHeadlines, headlines, fetchHeadlines, loading } = useNewsProvider();
  const [category, setCategory] = useState("news");

  useEffect(() => {
    fetchTopHeadlines();
    fetchHeadlines(category);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headlinesContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={50} color="white" />
          </View>
        ) : (
          <FlatList
            data={headlines}
            style={styles.headlinesList}
            renderItem={({ item }) => {
              return (
                (item.urlToImage ) ?
                  <HeadlinesCard
                    item={item}
                  /> : null
              )
            }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() =>
              <View>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Search</Text>
                  <Image source={pfp} style={styles.pfp} />
                </View>
                <Text style={styles.title}>Your Daily News</Text>
                <View style={styles.searchContainer}>
                  <FontAwesome name="search" color={'white'} size={20} />
                  <TextInput
                    value={search}
                    style={styles.searchInput}
                    onChangeText={setSearch}
                    placeholder="Search"
                    placeholderTextColor="white"
                    keyboardType="web-search"
                    multiline={false}
                    onSubmitEditing={() => {
                      fetchHeadlines(search)
                      setCategory("")
                    }}
                  />
                </View>
                <DraggableScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={styles.topHeadlinesList}
                >
                  {topHeadlines.map((item, index) => (
                    <TopHeadlinesCard
                      key={item.url}
                      newsData={item}
                    />
                  ))}
                </DraggableScrollView>
                <ScrollView horizontal style={styles.categoriesScroll} showsHorizontalScrollIndicator={false}>
                  {['General', 'Sports', 'Technology', 'Politics', 'Entertainment'].map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => {
                        setCategory(cat);
                        fetchHeadlines(cat);
                      }}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          { backgroundColor: (category === cat) ? '#283A4A' : '#161622' }
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  pfp: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#283A4A',
    marginVertical: 20,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    paddingHorizontal: 10,
  },
  topHeadlinesList: {
    maxHeight: 220,
    marginBottom:10
  },
  categoriesScroll: {
    maxHeight: 50
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',

  },
  headlinesContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headlinesList: {
  },
});

export default Index;
