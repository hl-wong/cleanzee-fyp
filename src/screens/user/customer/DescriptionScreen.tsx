import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { glob } from "../../../assets/styles";
import { getFontSize } from "../../../utils";

interface DescriptionScreenProps {
  desc: string;
}

const DescriptionScreen: React.FC<DescriptionScreenProps> = ({ desc }) => {
  return (
    <View
      style={[
        glob.container,
        {
          paddingHorizontal: Platform.OS === "ios" ? 24 : 16,
          paddingVertical: 16,
        },
      ]}
    >
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

export default DescriptionScreen;

const styles = StyleSheet.create({
  desc: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    lineHeight: Platform.OS === "ios" ? 28 : 24,
    textAlign: "justify",
  },
});
