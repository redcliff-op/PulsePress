import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native-animatable';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveBackgroundColor: '#19212E',
        tabBarActiveBackgroundColor: '#19212E',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel:'',
          tabBarIcon: () =>
            <Image
              source={require('../../assets/icons/home.png')}
              className='w-[20] h-[20] mt-3'
              tintColor={'#EF9508'}
            />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel:'',
          tabBarIcon: () =>
            <Image
              source={require('../../assets/icons/bookmark.png')}
              className='w-[20] h-[20] mt-3'
            />
        }}
      />
    </Tabs>
  );
}
