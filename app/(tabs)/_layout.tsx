import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native-animatable';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        
        headerShown: false,
        tabBarStyle: {
          backgroundColor:'#161622',
          borderTopWidth:0,
          height:45
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () =>
            <Image
              source={require('../../assets/icons/home.png')}
              className='w-[25] h-[25]'
              tintColor={'#EF9508'}
            />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: () =>
            <Image
              source={require('../../assets/icons/bookmark.png')}
              className='w-[25] h-[25]'
            />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () =>
            <Image
              source={require('../../assets/icons/profile.png')}
              className='w-[25] h-[25]'
            />
        }}
      />
    </Tabs>
  );
}
