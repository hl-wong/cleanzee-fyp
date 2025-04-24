import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { glob, theme } from "../../../assets/styles";
import { StatusBar } from "expo-status-bar";
import {
  ChatRoomHeader,
  Content,
  Footer,
  IconButton,
  MessageInput,
  RenderMessage,
  Row,
} from "../../../components";
import { goBack } from "../../../utils";
import { useFocusEffect } from "@react-navigation/native";
import { checkExistChat } from "../../../services";
import { io } from "socket.io-client";

interface ChatRoomScreenProps {
  navigation: any;
  route: any;
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({
  navigation,
  route,
}) => {
  const { id, receiverId } = route.params;
  const title = receiverId?.firstName
    ? `${receiverId?.firstName} ${receiverId?.lastName}`
    : receiverId?.userId
    ? `${receiverId?.userId?.firstName} ${receiverId?.userId?.lastName}`
    : "Anonymous";

  const socket = io("");

  useEffect(() => {
    if (!receiverId) return;

    socket.on("connect", () => {
      console.log(`Connected to WebSocket Server: ${socket.id}`);
      socket.emit("user_connected", id);
    });

    socket.on("receive_message", (data) => {
      console.log("New message received:", data);
      // if (data.senderId !== id) {
      //   setMessages((prevMessages) => [...prevMessages, data]);
      // }
      setMessages((prevMessages) => [...prevMessages, data]);
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, id, receiverId]);

  const [messages, setMessages] = useState<
    {
      chatId: string;
      message: string;
      senderId: string;
      timestamp: string;
    }[]
  >([]);
  const fetchChat = async () => {
    if (!receiverId) return;

    const response = await checkExistChat(id, receiverId._id);
    if (response.status === 200) {
      setMessages(response.data.messages);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChat();
    }, [id, receiverId])
  );

  const [message, setMessage] = useState("");
  const handleSend = async () => {
    if (message.trim() && receiverId && receiverId._id) {
      const newMessage = {
        chatId: Date.now().toString(),
        message: message,
        senderId: id,
        receiverId: receiverId._id,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send_message", newMessage);
      setMessages((prevMessages = []) => [
        ...prevMessages,
        { ...newMessage, senderId: id },
      ]);
      // await fetchChat();
      setMessage("");
    }
  };

  const flatListRef = useRef<FlatList>(null);

  return (
    <SafeAreaView
      edges={["top"]}
      style={[glob.layout, { backgroundColor: theme.color.primary }]}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={glob.container}
      >
        <ChatRoomHeader
          userImage={
            receiverId?.profilePicture || receiverId?.userId?.profilePicture
          }
          userName={title}
          onBack={() => goBack(navigation)}
        />

        <Content bgColor="white">
          <FlatList
            data={messages}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => {
              return (
                <RenderMessage
                  chatId={item.chatId}
                  message={item.message}
                  senderId={item.senderId}
                  timestamp={item.timestamp}
                  currentUserId={id}
                />
              );
            }}
            ref={flatListRef}
          />
        </Content>
        <Footer>
          <Row gap={16} style={glob.horizontalCenter}>
            <MessageInput
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              onSend={handleSend}
            />
            <IconButton
              variant="rounded"
              size="md"
              name="send"
              style={{ height: 48, width: 48 }}
              onPress={handleSend}
              iconColor={theme.color.white}
            />
          </Row>
        </Footer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({});
