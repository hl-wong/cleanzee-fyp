import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Row from "./Row";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { glob, theme } from "../assets/styles";

interface TagProps {
  size: "md" | "lg" | "xl";
  label: string;
}

const Tag: React.FC<TagProps> = ({ size, label }) => {
  return (
    <View
      style={[
        styles.tag,
        size === "md" && styles.md,
        size === "lg" && styles.lg,
        size === "xl" && styles.xl,
        glob.center,
      ]}
    >
      <Row gap={4} style={glob.horizontalCenter}>
        <MaterialIcons name="check" size={16} color={theme.color.white} />
        <Text style={styles.label}>{label}</Text>
      </Row>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: theme.color.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  md: {
    height: 20,
  },
  lg: {
    height: 28,
  },
  xl: {
    height: 40,
  },
  label: {
    color: theme.color.white,
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
