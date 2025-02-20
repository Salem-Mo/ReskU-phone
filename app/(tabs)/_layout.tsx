import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
        tabBarLabelStyle: styles.tabBarLabel, // Center the text
        tabBarIconStyle: styles.tabBarIcon, // Center the icon
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="LoginScreen"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <MaterialIcons
                name={focused ? 'login' : 'logout'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="ForgetPass"
        options={{
          title: 'Forgot Password',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Ionicons
                name={focused ? 'lock-closed' : 'lock-closed-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="MapPage"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <FontAwesome
                name={focused ? 'map' : 'map-o'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Ionicons
                name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profilepage"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: Platform.select({ ios: 0, android: 2 }), // Adjust for platform
  },
  tabBarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});