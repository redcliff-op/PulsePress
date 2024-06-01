import NewsProvider from '@/providers/NewsProvider';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayoutNav() {
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
