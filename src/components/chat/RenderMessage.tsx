import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { glob, theme } from "../../assets/styles";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import moment from "moment";

interface RenderMessagesProps {
  chatId: string;
  message: string;
  senderId: string;
  timestamp: string;
  currentUserId: string;
}

const RenderMessages: React.FC<RenderMessagesProps> = ({
  chatId,
  message,
  senderId,
  timestamp,
  currentUserId,
}) => {
  const isCurrentUser = senderId === currentUserId;

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.sended : styles.received,
      ]}
    >
      <View
        style={[
          styles.message,
          isCurrentUser
            ? { backgroundColor: theme.color.primary }
            : { backgroundColor: "#E5E5EA" },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isCurrentUser && { color: theme.color.white },
          ]}
        >
          {message}
        </Text>
      </View>

      <Text
        style={[
          styles.timestamp,
          isCurrentUser
            ? { alignSelf: "flex-end" }
            : { alignSelf: "flex-start" },
        ]}
      >
        {moment(timestamp).format("h:mm A")}
      </Text>
    </View>
  );
};

export default RenderMessages;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  sended: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  received: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  message: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: responsiveFontSize(2),
    lineHeight: Platform.OS === "ios" ? 28 : 24,
  },
  timestamp: {
    fontSize: responsiveFontSize(1.5),
    color: "gray",
  },
});
