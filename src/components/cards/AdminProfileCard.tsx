import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { glob, theme } from "../../assets/styles";
import Row from "../Row";
import Column from "../Column";
import { logo } from "../../assets/images";
import { getFontSize } from "../../utils";

const AdminProfileCard = () => {
  return (
    <Row gap={16} style={[styles.card, glob.horizontalCenter]}>
      <Image source={logo} style={styles.logo} />
      <Column gap={Platform.OS === "ios" ? 4 : 2}>
        <Text style={styles.adminName}>Cleanzee</Text>
        <Text style={styles.adminRole}>Admin</Text>
      </Column>
    </Row>
  );
};

export default AdminProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.color.white,
  },
  adminName: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
    color: theme.color.white,
  },
  adminRole: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    fontWeight: 500,
    color: theme.color.white,
  },
});
