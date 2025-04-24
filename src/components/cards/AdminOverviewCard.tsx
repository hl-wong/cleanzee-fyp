import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Column from "../Column";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface AdminOverviewCardProps {
  data: { label: string; value: number }[];
}

const AdminOverviewCard: React.FC<AdminOverviewCardProps> = ({ data }) => {
  return (
    <Column gap={16} style={styles.card}>
      <Text style={styles.title}>Overview</Text>
      <Row>
        {data.map((item, index) => {
          return (
            <Column
              key={index}
              gap={Platform.OS === "ios" ? 4 : 2}
              style={[glob.horizontalCenter, glob.container]}
            >
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </Column>
          );
        })}
      </Row>
    </Column>
  );
};

export default AdminOverviewCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 700,
  },
  value: {
    fontSize: Platform.OS === "ios" ? getFontSize(18) : getFontSize(20),
    fontWeight: 700,
    color: theme.color.primary,
  },
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(10) : getFontSize(12),
    color: "#666",
  },
});
