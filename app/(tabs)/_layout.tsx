import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native-animatable';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor:'#FFA001',
        tabBarStyle: {
          backgroundColor:'#161622',
          borderTopWidth:0,
          height:50
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({color}) =>
            <Image
              source={require('../../assets/icons/home.png')}
              className='w-[25] h-[25]'
              tintColor={color}
            />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({color}) =>
            <Image
              source={require('../../assets/icons/bookmark.png')}
              className='w-[25] h-[25]'
              tintColor={color}
            />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({color}) =>
            <Image
              source={require('../../assets/icons/profile.png')}
              className='w-[25] h-[25]'
              tintColor={color}
            />
        }}
      />
    </Tabs>
  );
}
