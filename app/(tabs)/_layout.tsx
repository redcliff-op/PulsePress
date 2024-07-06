import React from 'react';
import { Tabs } from 'expo-router';
import {Image, StyleSheet} from 'react-native'


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
              style={styles.image}
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
              style={styles.image}
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
              style={styles.image}
              tintColor={color}
            />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  image:{
    width:25,
    height:25
  }
})