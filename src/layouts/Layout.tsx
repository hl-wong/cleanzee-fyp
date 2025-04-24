import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { glob, theme } from "../assets/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { getFontSize } from "../utils";
import { Row } from "../components";

interface LayoutProps {
  children: ReactNode;
  headerTitle: string;
  onBack?: () => void;
  rightIcon?: {
    name: string;
    onPress: () => void;
  };
}

const Layout: React.FC<LayoutProps> = ({
  children,
  headerTitle,
  onBack,
  rightIcon,
}) => {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[glob.layout, { backgroundColor: theme.color.primary }]}
    >
      <StatusBar style="light" />
      <Row style={[glob.header, glob.horizontalCenter, glob.spaceBetween]}>
        <Row gap={16} style={glob.horizontalCenter}>
          {onBack && (
            <TouchableOpacity activeOpacity={0.8} onPress={onBack}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={theme.color.white}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </Row>

        {rightIcon && (
          <TouchableOpacity activeOpacity={0.8} onPress={rightIcon.onPress}>
            <MaterialIcons
              name={rightIcon.name}
              size={24}
              color={theme.color.white}
            />
          </TouchableOpacity>
        )}
      </Row>
      {children}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: Platform.OS === "ios" ? getFontSize(18) : getFontSize(20),
    fontWeight: 600,
    color: theme.color.white,
  },
});
