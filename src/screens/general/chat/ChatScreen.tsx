import { FlatList, StyleSheet } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Layout } from "../../../layouts";
import { getFontSize, navigateTo } from "../../../utils";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { UserContext } from "../../../context";
import { ChatItem, Content } from "../../../components";
import { getChats } from "../../../services";

interface ChatScreenProps {
  navigation: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const route = useRoute();
  const { role } = route.params as { role: string };
  const { user, cleaner } = useContext(UserContext);

  const id = role === "customer" ? user?._id : cleaner?._id;

  const [chats, setChats] = useState<
    {
      _id: string;
      senderId: any;
      receiverId: any;
      messages: {
        _id: string;
        message: string;
        senderId: string;
        timestamp: string;
      }[];
    }[]
  >([]);
  useFocusEffect(
    useCallback(() => {
      const fetchChat = async () => {
        const response = await getChats(id, role);
        if (response.status === 200) {
          setChats(response.data);
        }
      };

      fetchChat();
    }, [])
  );

  return (
    <Layout headerTitle="Chat">
      <Content bgColor="white">
        <FlatList
          data={chats}
          renderItem={({ item }) => {
            const otherPerson =
              item.senderId === id ? item.receiverId : item.senderId;
            const userProfilePicture =
              otherPerson?.profilePicture ??
              otherPerson?.userId?.profilePicture;
            const userName =
              role === "customer"
                ? otherPerson?.userId?.firstName && otherPerson?.userId.lastName
                  ? `${otherPerson?.userId?.firstName} ${otherPerson?.userId?.lastName}`
                  : "Anonymous"
                : role === "cleaner"
                ? otherPerson?.firstName && otherPerson?.lastName
                  ? `${otherPerson?.firstName} ${otherPerson?.lastName}`
                  : "Anonymous"
                : "Anonymous";
            const latestMessage =
              item.messages.length > 0
                ? item.messages[item.messages.length - 1].message
                : "";

            return (
              <ChatItem
                userImage={userProfilePicture}
                userName={userName}
                userLatestMessage={latestMessage}
                timestamp=""
                onPress={() =>
                  navigateTo(navigation, "Chat Stack", "Chat Room Screen", {
                    id: id,
                    receiverId: otherPerson,
                  })
                }
              />
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  userName: {
    fontSize: getFontSize(16),
    fontWeight: 700,
  },
});
