import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { glob, theme } from "../../assets/styles";

interface IconButtonProps {
  variant: "rounded" | "circle";
  size: "sm" | "md" | "lg";
  name: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant,
  name,
  size,
  onPress,
  style,
  iconSize,
  iconColor,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.icon,
        glob.center,
        variant === "rounded" && styles.rounded,
        variant === "circle" && styles.circle,
        size === "sm" && styles.sm,
        size === "md" && styles.md,
        size === "lg" && styles.lg,
        style,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons name={name} size={iconSize ?? 24} color={iconColor} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  icon: {
    height: 48,
    width: 48,
    backgroundColor: theme.color.primary,
  },
  rounded: {
    borderRadius: 5,
  },
  circle: {
    borderRadius: 100,
  },
  sm: {
    height: 32,
    width: 32,
  },
  md: {
    height: 44,
    width: 44,
  },
  lg: {
    height: 56,
    width: 56,
  },
});
