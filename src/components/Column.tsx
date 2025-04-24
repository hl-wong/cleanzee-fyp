import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

const Column: React.FC<ColumnProps> = ({ children, gap, style }) => {
  return <View style={[styles.column, { gap: gap }, style]}>{children}</View>;
};

export default Column;

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
});
