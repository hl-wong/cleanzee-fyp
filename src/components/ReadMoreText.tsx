import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { getFontSize } from "../utils";
import { theme } from "../assets/styles";

interface ReadMoreTextProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const ReadMoreText: React.FC<ReadMoreTextProps> = ({ text, style }) => {
  const [expanded, setExpanded] = useState(false);

  const maxLength = 150;
  const isLongText = text.length > maxLength;

  return (
    <View>
      <Text style={styles.text}>
        {isLongText && !expanded
          ? `${text.substring(0, maxLength)}... `
          : `${text} `}
        {isLongText && (
          <Text
            style={styles.ReadMoreText}
            onPress={() => setExpanded(!expanded)}
          >
            {expanded ? "See Less" : "See More"}
          </Text>
        )}
      </Text>
    </View>
  );
};

export default ReadMoreText;

const styles = StyleSheet.create({
  text: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    lineHeight: Platform.OS === "ios" ? 28 : 24,
  },
  ReadMoreText: {
    color: theme.color.primary,
    fontWeight: 700,
  },
});
