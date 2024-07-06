import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Link href={`/(tabs)`} asChild>
        <Text style={styles.welcomeText}>Welcome</Text>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Assuming bg-background corresponds to a dark color
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24, // 3xl usually corresponds to 24 or 28, adjust if needed
    color: 'white',
    fontWeight: 'bold',
  },
});

export default index;
