import { FlatList, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNewsProvider } from '@/providers/NewsProvider'
import HeadlinesCard from '@/components/HeadlinesCard'

const saved = () => {

  const {savedNews} = useNewsProvider()

  return (
    <SafeAreaView className="flex-1 bg-background px-5 py-2">
      <Text className="text-white font-bold text-2xl">Bookmarked Articles</Text>
      <FlatList
        data={savedNews}
        keyExtractor={(item)=>item.url}
        renderItem={({ item }) => (
          item.urlToImage ?
            <HeadlinesCard
              item={item}
            /> : null
        )}
      />
    </SafeAreaView>
  )
}

export default saved;