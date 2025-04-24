import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import Row from "../Row";
import { getFontSize } from "../../utils";
import { glob, theme } from "../../assets/styles";

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  value,
  onValueChange,
}) => {
  return (
    <Row gap={8} style={glob.horizontalCenter}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? theme.color.primary : "#f4f3f4"}
        trackColor={{ true: theme.color.primary, false: "#767577" }}
      />
      <Text style={styles.label}>{label}</Text>
    </Row>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
});
