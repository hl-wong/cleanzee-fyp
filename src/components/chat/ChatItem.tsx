import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";
import Column from "../Column";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface ChatItemProps {
  userImage?: string;
  userName: string;
  userLatestMessage: string;
  timestamp: string;
  onPress?: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  userImage,
  userName,
  userLatestMessage,
  timestamp,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Row
        gap={16}
        style={[
          glob.horizontalCenter,
          { padding: 16, borderBottomWidth: 1, borderBottomColor: "#D9D9D9" },
        ]}
      >
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.userImage} />
        ) : (
          <MaterialIcons
            name="account-circle"
            size={60}
            color={theme.color.black}
          />
        )}
        <Column gap={Platform.OS === "ios" ? 6 : 4} style={{ flexShrink: 1 }}>
          <Row
            style={[
              glob.horizontalCenter,
              glob.spaceBetween,
              { width: "100%" },
            ]}
          >
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </Row>
          <Text numberOfLines={1} style={styles.userLatestMessage}>
            {userLatestMessage}
          </Text>
        </Column>
      </Row>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  timestamp: {
    color: "#A6A6A6",
    fontSize: Platform.OS === "ios" ? getFontSize(10) : getFontSize(12),
  },
  userLatestMessage: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#A6A6A6",
  },
});
