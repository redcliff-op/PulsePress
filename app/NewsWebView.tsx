import { SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import WebView from 'react-native-webview';

const NewsWebView = () => {
  const { newsUrl } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-background">
      <WebView
        className='flex-1'
        source={{ uri: newsUrl.toString() }}>
      </WebView>
    </SafeAreaView>
  )
}

export default NewsWebView;