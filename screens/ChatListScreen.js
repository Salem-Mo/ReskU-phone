import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#3498db',
  darkBackground: '#1e1e1e',
  sidebarBackground: '#2c2c2c',
  lightText: '#ffffff',
};

export default function ChatListScreen() {
  const navigation = useNavigation();

  const chats = {
    directMessages: [
      { id: 1, name: 'Mario Maxim', messages: [] },
      { id: 2, name: 'John Doe', messages: [] },
    ],
    rooms: [
      { id: 1, name: 'حادث', messages: [] },
      { id: 2, name: 'حادث في دمنهور', messages: [] },
    ],
  };

  const renderSidebarItem = (item, type) => (
    <TouchableOpacity
      key={item.id}
      style={styles.sidebarItem}
      onPress={() => navigation.navigate('Chat', { chatId: item.id, type })}
    >
      {type === 'room' ? (
        <Text style={styles.hash}>#</Text>
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
      )}
      <Text style={styles.sidebarItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.logo}>∞ ReskU</Text>
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>DIRECT MESSAGES</Text>
        </View>
        <ScrollView>
          {chats.directMessages.map(dm => renderSidebarItem(dm, 'directMessage'))}
        </ScrollView>
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>ROOMS</Text>
        </View>
        <ScrollView>
          {chats.rooms.map(room => renderSidebarItem(room, 'room'))}
        </ScrollView>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>
          <Text style={styles.username}>Salem MOX</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profilepage')}>
            <Ionicons name="pencil" size={20} color={colors.lightText} />
          </TouchableOpacity>
        </View>
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
    width: 250,
    backgroundColor: colors.sidebarBackground,
    padding: 10,
  },
  logo: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  sidebarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sidebarTitle: {
    color: colors.lightText,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sidebarItemText: {
    color: colors.lightText,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: colors.lightText,
    fontWeight: 'bold',
  },
  hash: {
    color: colors.lightText,
    fontSize: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  username: {
    color: colors.lightText,
    marginLeft: 10,
    flex: 1,
  },
});