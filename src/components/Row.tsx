import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

const Row: React.FC<RowProps> = ({ children, gap, style }) => {
  return <View style={[styles.row, { gap: gap }, style]}>{children}</View>;
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
