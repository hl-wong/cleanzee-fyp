import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { glob, theme } from "../assets/styles";

interface ContentProps {
  children: ReactNode;
  bgColor?: "default" | "white";
  style?: StyleProp<ViewStyle>;
}

const Content: React.FC<ContentProps> = ({ children, bgColor, style }) => {
  return (
    <View
      style={[
        glob.container,
        bgColor === "default" && { backgroundColor: "#F2F2F2" },
        bgColor === "white" && { backgroundColor: theme.color.white },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
