import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const colors = {
  primary: '#3498db',
  darkBackground: '#1e1e1e',
  chatBackground: '#1e1e1e',
  lightText: '#ffffff',
  incomingMessage: '#3a3a3a',
  outgoingMessage: '#4a148c',
  inputBackground: '#3a3a3a',
  borderColor: '#3a3a3a',
};

export default function ChatScreen() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams();

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
    const chat = [...chats.directMessages, ...chats.rooms].find(chat => chat.id == chatId);
    setActiveChat(chat);
  }, [chatId]);

  const sendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage = { id: Date.now(), text: message, time: new Date().toLocaleTimeString(), outgoing: true };

      setChats(prevChats => {
        const updatedChats = { ...prevChats };
        const chatList = updatedChats.directMessages.find(chat => chat.id == chatId)
          ? 'directMessages'
          : 'rooms';
        const chatIndex = updatedChats[chatList].findIndex(chat => chat.id == chatId);

        if (chatIndex !== -1) {
          updatedChats[chatList][chatIndex].messages.push(newMessage);
        }

        return updatedChats;
      });

      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderText}>{activeChat?.name}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.lightText} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.messagesContainer}>
        <Text style={styles.dateText}>{new Date().toDateString()}</Text>
        {activeChat?.messages.map(msg => (
          <View key={msg.id} style={[styles.message, msg.outgoing ? styles.outgoingMessage : styles.incomingMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type a message" placeholderTextColor={colors.lightText} value={message} onChangeText={setMessage} />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color={colors.lightText} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkBackground },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  chatHeaderText: { color: colors.lightText, fontSize: 18, fontWeight: 'bold' },
  messagesContainer: { flex: 1, padding: 10 },
  dateText: { color: colors.lightText, textAlign: 'center', marginVertical: 10 },
  message: { maxWidth: '70%', padding: 10, borderRadius: 10, marginBottom: 10 },
  incomingMessage: { alignSelf: 'flex-start', backgroundColor: colors.incomingMessage },
  outgoingMessage: { alignSelf: 'flex-end', backgroundColor: colors.outgoingMessage },
  messageText: { color: colors.lightText },
  messageTime: { color: colors.lightText, fontSize: 12, alignSelf: 'flex-end', marginTop: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  input: { flex: 1, backgroundColor: colors.inputBackground, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, color: colors.lightText },
  sendButton: { backgroundColor: colors.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});
