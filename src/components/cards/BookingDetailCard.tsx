import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { glob, theme } from "../../assets/styles";
import Row from "../Row";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Column from "../Column";
import { getFontSize } from "../../utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface BookingDetailCardProps {
  statusMessage: string;
  serviceImage: string;
  serviceName: string;
  serviceCategory: string;
  servicePrice: string;
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postcode: string;
    phoneNo: string;
  };
}

const BookingDetailCard: React.FC<BookingDetailCardProps> = ({
  statusMessage,
  serviceImage,
  serviceName,
  serviceCategory,
  servicePrice,
  address,
}) => {
  return (
    <Column style={styles.card}>
      <Row gap={8} style={[styles.statusWrapper, glob.horizontalCenter]}>
        <MaterialCommunityIcons
          name="progress-clock"
          size={Platform.OS === "ios" ? 22 : 20}
          color={theme.color.white}
        />
        <Text style={styles.statusMessage}>{statusMessage}</Text>
      </Row>
      <Row
        gap={16}
        style={{ padding: 16, borderBottomWidth: 1, borderColor: "#D9D9D9" }}
      >
        <Image source={{ uri: serviceImage }} style={styles.serviceImage} />
        <Column gap={Platform.OS === "ios" ? 4 : 2} style={{ flexShrink: 1 }}>
          <Text numberOfLines={1} style={styles.serviceName}>
            {serviceName}
          </Text>
          <Text style={styles.serviceCategory}>{serviceCategory}</Text>
          <Text style={styles.servicePrice}>{`RM${servicePrice}`}</Text>
        </Column>
      </Row>
      <Column
        gap={Platform.OS === "ios" ? 8 : 6}
        style={{ paddingVertical: 16, paddingHorizontal: 16 }}
      >
        <Text style={styles.label}>Address</Text>
        <Column gap={Platform.OS === "ios" ? 4 : 2}>
          <Text style={styles.fullName}>{address.fullName}</Text>
          <Column gap={Platform.OS === "ios" ? 4 : 2}>
            <Text style={styles.street}>{address.street}</Text>
            <Text
              style={styles.location}
            >{`${address.postcode} ${address.city} ${address.state}`}</Text>
            <Text style={styles.phoneNo}>{address.phoneNo}</Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
};

export default BookingDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    borderRadius: 8,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusWrapper: {
    backgroundColor: theme.color.secondary,
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  statusMessage: {
    color: theme.color.white,
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
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
  servicePrice: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    color: theme.color.primary,
    fontWeight: 700,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  fullName: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 500,
  },
  street: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
  location: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
  phoneNo: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
  },
});
