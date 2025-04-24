import { Image, Platform, StyleSheet, Text } from "react-native";
import React from "react";
import Row from "../Row";
import Column from "../Column";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { glob } from "../../assets/styles";
import { getFontSize } from "../../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

interface RRItemProps {
  userProfilePicture: string;
  userName: string;
  userRating: number;
  userReview: string;
  date: string;
}

const RRItem: React.FC<RRItemProps> = ({
  userProfilePicture,
  userName,
  userRating,
  userReview,
  date,
}) => {
  return (
    <Row gap={16} style={{ padding: 16 }}>
      {userProfilePicture ? (
        <Image source={{ uri: userProfilePicture }} style={styles.userImage} />
      ) : (
        <MaterialIcons name="account-circle" size={40} />
      )}
      <Column gap={12} style={{ flexShrink: 1 }}>
        <Column gap={4}>
          <Text style={styles.userName}>{userName}</Text>
          <Row
            style={[
              glob.spaceBetween,
              glob.horizontalCenter,
              { width: "100%" },
            ]}
          >
            <Row gap={2}>
              {Array.from({ length: 5 }).map((_, index) => (
                <FontAwesomeIcons
                  key={index}
                  name="star"
                  size={18}
                  color={index < userRating ? "gold" : "#F5F5F5"}
                />
              ))}
            </Row>
            <Text style={styles.date}>{moment(date).fromNow()}</Text>
          </Row>
        </Column>
        <Text style={styles.cleanerReview}>{userReview}</Text>
      </Column>
    </Row>
  );
};

export default RRItem;

const styles = StyleSheet.create({
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  date: {
    color: "#888888",
  },
  cleanerReview: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    lineHeight: Platform.OS === "ios" ? 24 : 22,
  },
});
