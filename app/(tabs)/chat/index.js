import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const colors = {
  primary: '#3498db',
  darkBackground: '#1e1e1e',
  sidebarBackground: '#2c2c2c',
  lightText: '#ffffff',
  hoverBackground: '#3a3a3a',
};

export default function ChatListScreen() {
  const router = useRouter();

  const chats = {
    directMessages: [
      { id: 1, name: 'Mario Maxim' },
      { id: 2, name: 'John Doe' },
    ],
    rooms: [
      { id: 1, name: 'حادث' },
      { id: 2, name: 'حادث في دمنهور' },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Logo */}
        <Text style={styles.logo}>∞ ReskU</Text>

        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <Ionicons name="person-circle-outline" size={40} color={colors.primary} />
          <Text style={styles.profileText}>Welcome, User</Text>
        </View>

        {/* Direct Messages Section */}
        <Text style={styles.sidebarTitle}>DIRECT MESSAGES</Text>
        <ScrollView style={styles.scrollSection}>
          {chats.directMessages.map((dm) => (
            <TouchableOpacity
              key={dm.id}
              style={styles.sidebarItem}
              onPress={() => router.push(`/chat/${dm.id}`)}
            >
              <Ionicons name="person-outline" size={20} color={colors.lightText} style={styles.icon} />
              <Text style={styles.sidebarItemText}>{dm.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rooms Section */}
        <Text style={styles.sidebarTitle}>ROOMS</Text>
        <ScrollView style={styles.scrollSection}>
          {chats.rooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={styles.sidebarItem}
              onPress={() => router.push(`/chat/${room.id}`)}
            >
              <Ionicons name="people-outline" size={20} color={colors.lightText} style={styles.icon} />
              <Text style={styles.sidebarItemText}>{room.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  sidebar: {
    flex: 1,
    backgroundColor: colors.sidebarBackground,
    padding: 20,
  },
  logo: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileText: {
    color: colors.lightText,
    fontSize: 16,
    marginTop: 10,
  },
  sidebarTitle: {
    color: colors.lightText,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
    opacity: 0.7,
  },
  scrollSection: {
    flex: 1,
    marginBottom: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  sidebarItemText: {
    color: colors.lightText,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});