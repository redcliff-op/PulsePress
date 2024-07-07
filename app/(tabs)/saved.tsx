import { FlatList, Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNewsProvider } from '@/providers/NewsProvider';
import HeadlinesCard from '@/components/HeadlinesCard';

const Saved = () => {
  const { savedNews } = useNewsProvider();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bookmarked Articles</Text>
      </View>
      <FlatList
        data={savedNews}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          item.urlToImage ? <HeadlinesCard item={item} /> : null
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#161622',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Saved;
