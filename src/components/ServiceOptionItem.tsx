import { Platform, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import React from "react";
import Row from "./Row";
import { glob, theme } from "../assets/styles";
import Column from "./Column";
import { getFontSize } from "../utils";
import { IconButton } from "./buttons";

interface ServiceOptionItemProps {
  label: string;
  price: string;
  detail: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconName: string;
}

const ServiceOptionItem: React.FC<ServiceOptionItemProps> = ({
  label,
  price,
  detail,
  onPress,
  style,
  iconName,
}) => {
  return (
    <Row
      style={[glob.horizontalCenter, glob.spaceBetween, { padding: 16 }, style]}
    >
      <Column gap={Platform.OS === "ios" ? 4 : 2}>
        <Text
          style={{
            fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
          }}
        >
          <Text style={styles.label}>{label}</Text> ({detail})
        </Text>
        <Text>
          <Text style={styles.price}>{`RM${price}`}</Text>/hour
        </Text>
      </Column>
      <IconButton
        variant="rounded"
        size="sm"
        name={iconName}
        iconColor={theme.color.white}
        onPress={onPress}
      />
    </Row>
  );
};

export default ServiceOptionItem;

const styles = StyleSheet.create({
  label: {
    fontWeight: 600,
  },
  price: {
    fontSize: Platform.OS === "ios" ? getFontSize(16) : getFontSize(18),
    fontWeight: 700,
    color: theme.color.primary,
  },
});
