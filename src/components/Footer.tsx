import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { theme } from "../assets/styles";

interface FooterProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Footer: React.FC<FooterProps> = ({ children, style }) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
      {Platform.OS === "ios" && <View style={{ height: 16 }} />}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: theme.color.white,
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: theme.color.black,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    }),
  },
});
