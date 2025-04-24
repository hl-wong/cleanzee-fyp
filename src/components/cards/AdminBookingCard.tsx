import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { glob, theme } from "../../assets/styles";
import Row from "../Row";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Column from "../Column";
import { getFontSize } from "../../utils";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";

interface AdminBookingCardProps {
  bookingStatus: string;
  serviceImage: string;
  serviceName: string;
  serviceCategory: string;
  userName: string;
  cleanerName: string;
  createdAt: string;
  onPress: () => void;
}

const AdminBookingCard: React.FC<AdminBookingCardProps> = ({
  bookingStatus,
  serviceImage,
  serviceName,
  serviceCategory,
  userName,
  cleanerName,
  createdAt,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Column>
        <Row
          style={[
            glob.spaceBetween,
            glob.horizontalCenter,
            {
              borderBottomWidth: 1,
              borderColor: "#D9D9D9",
              padding: 16,
            },
          ]}
        >
          <Text style={styles.createdAt}>
            Date: {moment(createdAt).format("DD MMMM YYYY")}
          </Text>
          <Text style={styles.bookingStatus}>{bookingStatus}</Text>
        </Row>
        <Row
          gap={16}
          style={[
            glob.horizontalCenter,
            glob.spaceBetween,
            { padding: 16, flexShrink: 1 },
          ]}
        >
          <Row gap={16} style={{ flexShrink: 1 }}>
            <Image source={{ uri: serviceImage }} style={styles.serviceImage} />
            <Column
              gap={Platform.OS === "ios" ? 2 : 0}
              style={{ flexShrink: 1 }}
            >
              <Text numberOfLines={1} style={styles.serviceName}>
                {serviceName}
              </Text>
              <Text style={styles.serviceCategory}>{serviceCategory}</Text>
            </Column>
          </Row>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={theme.color.info}
          />
        </Row>
        <Row style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <Column gap={Platform.OS === "ios" ? 8 : 6}>
            <Row
              style={[
                glob.horizontalCenter,
                glob.spaceBetween,
                { width: "100%" },
              ]}
            >
              <Text style={styles.label}>User:</Text>

              <Text style={styles.userName}>{userName}</Text>
            </Row>
            <Row
              style={[
                glob.horizontalCenter,
                glob.spaceBetween,
                { width: "100%" },
              ]}
            >
              <Text style={styles.label}>Cleaner:</Text>
              <Text style={styles.userName}>{cleanerName}</Text>
            </Row>
          </Column>
        </Row>
      </Column>
    </TouchableOpacity>
  );
};

export default AdminBookingCard;

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
  createdAt: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
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
    fontWeight: 600,
  },
  serviceCategory: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#666",
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  userName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
    color: theme.color.primary,
  },
});
