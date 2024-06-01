import NewsProvider from '@/providers/NewsProvider';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function RootLayoutNav() {
  NavigationBar.setBackgroundColorAsync('#161622');
  return (
    <View className='bg-background flex-1'>
      <NewsProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation:'fade_from_bottom' }} />
          <Stack.Screen name='NewsView' options={{ headerShown: false }} />
          <Stack.Screen name='NewsWebView' options={{ headerShown: false }} />
        </Stack>
      </NewsProvider>
    </View>
  );
}
