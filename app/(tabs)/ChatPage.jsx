import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const colors = {
  primary: '#3498db',
  darkBackground: '#1e1e1e',
  sidebarBackground: '#2c2c2c',
  chatBackground: '#1e1e1e',
  lightText: '#ffffff',
  incomingMessage: '#3a3a3a',
  outgoingMessage: '#4a148c',
  inputBackground: '#3a3a3a',
  borderColor: '#3a3a3a',
};

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState({
    directMessages: [
      { id: 1, name: 'Mario Maxim', messages: [] },
      { id: 2, name: 'John Doe', messages: [] },
    ],
    rooms: [
      { id: 1, name: 'حادث', messages: [] },
      { id: 2, name: 'حادث في دمنهور', messages: [] },
    ],
  });

  useEffect(() => {
    if (activeChat === null && chats.directMessages.length > 0) {
      setActiveChat({ type: 'directMessage', id: chats.directMessages[0].id });
    }
  }, []);

  const renderSidebarItem = (item, type) => (
    <TouchableOpacity
      key={item.id}
      style={styles.sidebarItem}
      onPress={() => setActiveChat({ type, id: item.id })}
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

  const renderMessage = (msg) => (
    <View key={msg.id} style={[styles.message, msg.outgoing ? styles.outgoingMessage : styles.incomingMessage]}>
      <Text style={styles.messageText}>{msg.text}</Text>
      <Text style={styles.messageTime}>{msg.time}</Text>
    </View>
  );

  const sendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage = {
        id: Date.now(),
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        outgoing: true,
      };

      setChats(prevChats => {
        const updatedChats = { ...prevChats };
        const chatList = activeChat.type === 'directMessage' ? 'directMessages' : 'rooms';
        const chatIndex = updatedChats[chatList].findIndex(chat => chat.id === activeChat.id);
        
        if (chatIndex !== -1) {
          updatedChats[chatList][chatIndex].messages.push(newMessage);
        }

        return updatedChats;
      });

      setMessage('');
    }
  };

  const activeChatData = activeChat
    ? (activeChat.type === 'directMessage'
        ? chats.directMessages.find(dm => dm.id === activeChat.id)
        : chats.rooms.find(room => room.id === activeChat.id))
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profilepage')}>
          <Text style={styles.logo}>∞ ReskU</Text>
          </TouchableOpacity>
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

        {/* Chat Area */}
        {activeChatData && (
          <View style={styles.chatArea}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderText}>{activeChatData.name}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MapPage')}>
                <Ionicons name="close" size={24} color={colors.lightText} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.messagesContainer}>
              <Text style={styles.dateText}>{new Date().toDateString()}</Text>
              {activeChatData.messages.map(renderMessage)}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type a message"
                placeholderTextColor={colors.lightText}
                value={message}
                onChangeText={setMessage}
              />
              <View style={styles.inputIcons}>
                <TouchableOpacity>
                <Ionicons name="mic" size={24} color={colors.lightText} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Ionicons name="attach" size={24} color={colors.lightText} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Ionicons name="happy" size={24} color={colors.lightText} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={24} color={colors.lightText} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
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
  chatArea: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.chatBackground,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  chatHeaderText: {
    color: colors.lightText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  dateText: {
    color: colors.lightText,
    textAlign: 'center',
    marginVertical: 10,
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  incomingMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.incomingMessage,
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.outgoingMessage,
  },
  messageText: {
    color: colors.lightText,
  },
  messageTime: {
    color: colors.lightText,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  input: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: colors.lightText,
  },
  inputIcons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});