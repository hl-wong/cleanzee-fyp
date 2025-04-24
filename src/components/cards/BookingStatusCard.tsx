import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface BookingStatusCardProps {
  status: {
    label: string;
    count: number;
  }[];
}

const BookingStatusCard: React.FC<BookingStatusCardProps> = ({ status }) => {
  return (
    <Column gap={16} style={styles.card}>
      <Text style={styles.title}>Booking Status</Text>
      <Row style={[glob.horizontalCenter, glob.spaceBetween]}>
        {status.map((item, index) => {
          return (
            <Column
              key={index}
              gap={2}
              style={[glob.horizontalCenter, glob.container]}
            >
              <Text style={styles.count}>{item.count}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </Column>
          );
        })}
      </Row>
    </Column>
  );
};

export default BookingStatusCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  count: {
    fontSize: Platform.OS === "ios" ? getFontSize(18) : getFontSize(20),
    fontWeight: 700,
    color: theme.color.primary,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(10) : getFontSize(12),
    color: "#666",
  },
});
