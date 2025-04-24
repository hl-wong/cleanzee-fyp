import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatRoomScreen, ChatScreen } from "../../../screens";

const Chat = createNativeStackNavigator();

interface ChatStackProps {
  route: any;
}

const ChatStack: React.FC<ChatStackProps> = ({ route }) => {
  const { role } = route.params;

  return (
    <Chat.Navigator screenOptions={{ headerShown: false }}>
      <Chat.Screen
        name="Chat Screen"
        component={ChatScreen}
        initialParams={{ role: role }}
      />
      <Chat.Screen name="Chat Room Screen" component={ChatRoomScreen} />
    </Chat.Navigator>
  );
};

export default ChatStack;
