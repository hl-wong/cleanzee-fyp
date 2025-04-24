import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface ModalContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ModalContent: React.FC<ModalContentProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

export default ModalContent;

const styles = StyleSheet.create({});
