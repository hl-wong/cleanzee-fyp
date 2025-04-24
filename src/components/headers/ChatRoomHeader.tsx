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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getFontSize } from "../../utils";

interface ChatRoomHeaderProps {
  userImage: string;
  userName: string;
  onBack: () => void;
}

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  userImage,
  userName,
  onBack,
}) => {
  return (
    <Row gap={16} style={[glob.horizontalCenter, { padding: 16 }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color={theme.color.white} />
      </TouchableOpacity>
      {userImage ? (
        <Image source={{ uri: userImage }} style={styles.userImage} />
      ) : (
        <MaterialIcons
          name="account-circle"
          size={35}
          color={theme.color.white}
        />
      )}
      <Text style={styles.userName}>{userName}</Text>
    </Row>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
    color: theme.color.white,
  },
});
