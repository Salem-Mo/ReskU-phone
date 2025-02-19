import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '@/screens/ChatListScreen';
import ChatScreen from '@/screens/ChatScreen';

const Stack = createStackNavigator();

export default function ChatPage() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
