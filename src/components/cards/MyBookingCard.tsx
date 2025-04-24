import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getFontSize } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface MyBookingCardProps {
  userProfilePicture?: string;
  userName: string;
  bookingStatus: string;
  serviceImage: string;
  serviceName: string;
  serviceCategory: string;
  onPress: () => void;
}

const MyBookingCard: React.FC<MyBookingCardProps> = ({
  userProfilePicture,
  userName,
  bookingStatus,
  serviceImage,
  serviceName,
  serviceCategory,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Column>
        <Row
          gap={16}
          style={[
            glob.spaceBetween,
            glob.horizontalCenter,
            {
              borderBottomWidth: 1,
              borderColor: "#D9D9D9",
              paddingVertical: 8,
              paddingHorizontal: 16,
            },
          ]}
        >
          <Row gap={8} style={[glob.horizontalCenter]}>
            {userProfilePicture ? (
              <Image
                source={{ uri: userProfilePicture }}
                style={styles.userProfilePicture}
              />
            ) : (
              <MaterialIcons name="account-circle" size={35} />
            )}
            <Text numberOfLines={1} style={styles.userName}>
              {userName}
            </Text>
          </Row>
          <Text style={styles.bookingStatus}>{bookingStatus}</Text>
        </Row>

        <Row gap={16} style={{ padding: 16 }}>
          <Image source={{ uri: serviceImage }} style={styles.serviceImage} />
          <Column gap={Platform.OS === "ios" ? 2 : 0} style={{ flexShrink: 1 }}>
            <Text numberOfLines={1} style={styles.serviceName}>
              {serviceName}
            </Text>
            <Text style={styles.serviceCategory}>{serviceCategory}</Text>
          </Column>
        </Row>
      </Column>
    </TouchableOpacity>
  );
};

export default MyBookingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    borderRadius: 8,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  userProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  bookingStatus: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: theme.color.primary,
    fontWeight: 600,
  },
  serviceImage: {
    height: wp("20%"),
    width: wp("20%"),
    borderRadius: 10,
  },
  serviceName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  serviceCategory: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#666",
  },
  statusMessage: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
});
