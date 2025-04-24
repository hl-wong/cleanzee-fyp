import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { glob, theme } from "../assets/styles";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getFontSize } from "../utils";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { Column, Row } from "../components";

interface HeaderLayoutProps {
  children: ReactNode;
  type?: "help" | "balance" | "rating";
  headerTitle: string;
  headerSubtitle?: string;
  onBack: () => void;
  averageRating?: number;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  children,
  type,
  headerTitle,
  headerSubtitle,
  onBack,
  averageRating,
}) => {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[glob.layout, { backgroundColor: theme.color.primary }]}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={onBack}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={theme.color.white}
          />
        </TouchableOpacity>
        <Column
          gap={Platform.OS === "ios" ? 6 : 4}
          style={[
            glob.center,
            { paddingVertical: Platform.OS === "ios" ? 48 : 32 },
          ]}
        >
          {type === "balance" && (
            <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
          )}
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          {type === "rating" && (
            <>
              <Row gap={4}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcons
                    key={index}
                    name="star"
                    color={
                      index < Math.floor(averageRating ?? 0)
                        ? "gold"
                        : "#F5F5F5"
                    }
                    size={20}
                  />
                ))}
              </Row>
              <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
            </>
          )}
        </Column>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default HeaderLayout;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: Platform.OS === "ios" ? getFontSize(26) : getFontSize(28),
    color: theme.color.white,
    fontWeight: 700,
  },
  headerSubtitle: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: theme.color.white,
  },
});
