import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { getFontSize } from "../../utils";
import { theme } from "../../assets/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Column from "../Column";
import { FormErrorMessage } from "../errors";

interface DateTimeInputProps {
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  mode: "date" | "time" | "datetime";
  value?: Date;
  onChange?: (date: Date) => void;
  errors?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  placeholder,
  style,
  mode,
  value,
  onChange,
  errors,
}) => {
  const [visible, setVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(
    value
      ? mode === "time"
        ? value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : mode === "datetime"
        ? value.toLocaleString()
        : value.toLocaleDateString()
      : ""
  );

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.7}
      onPress={() => setVisible(true)}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <Column gap={8}>
        <TextInput
          style={[styles.input, label && { marginTop: 8 }]}
          editable={false}
          placeholder={placeholder}
          value={displayValue}
          onPress={() => setVisible(true)}
        />
        {errors && <FormErrorMessage errors={errors} />}
      </Column>

      <DateTimePickerModal
        isVisible={visible}
        mode={mode}
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onConfirm={(value: Date) => {
          setVisible(false);
          const formattedValue =
            mode === "time"
              ? value.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : mode === "datetime"
              ? value.toLocaleDateString
              : value.toLocaleDateString();
          setDisplayValue(formattedValue);
          if (onChange) {
            onChange(value);
          }
        }}
        onCancel={() => setVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default DateTimeInput;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  input: {
    borderWidth: 1,
    borderColor: "#A6A6A6",
    borderRadius: 4,
    backgroundColor: theme.color.white,
    height: 48,
    paddingHorizontal: 16,
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
});
