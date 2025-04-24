import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary" | "link";
  label?: string;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
  hasIcon?: {
    name: string;
  };
  disabled?: boolean;
  labelColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  label,
  onPress,
  size,
  style,
  hasIcon,
  disabled,
  labelColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        variant !== "link" && styles.button,
        size === "sm" && styles.sm,
        size === "md" && styles.md,
        size === "lg" && styles.lg,
        variant === "primary" && (disabled ? styles.disabled : styles.primary),
        variant === "secondary" &&
          (disabled ? styles.disabled : styles.secondary),
        variant === "link" && { alignSelf: "flex-start" },
        glob.center,
        style,
      ]}
      onPress={!disabled ? onPress : undefined}
      activeOpacity={disabled ? 1 : variant === "primary" ? 0.9 : 0.7}
      disabled={disabled}
    >
      <Row gap={8} style={glob.horizontalCenter}>
        {hasIcon && (
          <MaterialIcons
            name={hasIcon.name}
            size={24}
            color={
              variant === "primary"
                ? theme.color.white
                : variant === "secondary" || variant === "tertiary"
                ? theme.color.primary
                : theme.color.black
            }
          />
        )}
        <Text
          style={[
            styles.label,
            size === "sm" && { fontSize: getFontSize(14) },
            size === "md" && {
              fontSize:
                Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
            },
            size === "lg" && {
              fontSize:
                Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
            },
            variant === "primary" && { color: theme.color.white },
            variant === "secondary" && { color: theme.color.primary },
            variant === "tertiary" && { color: theme.color.primary },
            variant === "link" && styles.link,

            labelColor && { color: labelColor },
            disabled && { color: "#C0C0C0" },
          ]}
        >
          {label}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  primary: {
    backgroundColor: theme.color.primary,
  },
  secondary: {
    borderWidth: 1,
    borderColor: theme.color.primary,
  },
  sm: {
    height: 32,
    paddingHorizontal: 16,
  },
  md: {
    height: 44,
    paddingHorizontal: 24,
  },
  lg: {
    height: 52,
    paddingHorizontal: 32,
  },
  label: {
    fontWeight: 700,
  },
  link: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    color: theme.color.primary,
  },
  disabled: {
    backgroundColor: "#F1F1F1",
  },
});
