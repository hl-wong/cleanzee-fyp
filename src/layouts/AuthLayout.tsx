import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { glob, theme } from "../assets/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { getFontSize } from "../utils";
import { Column, Content, Footer } from "../components";

interface AuthLayoutProps {
  headerTitle: string;
  headerDesc?: string;
  onBack: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  headerTitle,
  headerDesc,
  onBack,
  children,
  footer,
}) => {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[glob.layout, { backgroundColor: theme.color.primary }]}
    >
      <StatusBar style="light" />
      <Column gap={16} style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={onBack}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={theme.color.white}
          />
        </TouchableOpacity>

        <Column>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          {headerDesc && (
            <Text style={[glob.desc, styles.headerDesc]}>{headerDesc}</Text>
          )}
        </Column>
      </Column>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={glob.container}
      >
        <Content
          bgColor="white"
          style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        >
          <View style={[glob.center, { height: 24 }]}>
            <View style={styles.handle} />
          </View>
          <ScrollView contentContainerStyle={styles.scroll}>
            {children}
          </ScrollView>
        </Content>
        {footer && <Footer>{footer}</Footer>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  headerTitle: {
    fontSize: getFontSize(24),
    fontWeight: 700,
    textAlign: "center",
    color: theme.color.white,
  },
  headerDesc: {
    textAlign: "center",
    marginTop: 16,
    color: theme.color.white,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    alignSelf: "center",
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
