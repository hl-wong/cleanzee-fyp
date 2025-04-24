import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Platform,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { forwardRef, useState } from "react";
import { getFontSize } from "../../utils";
import { glob, theme } from "../../assets/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Column from "../Column";
import Row from "../Row";
import { FormErrorMessage } from "../errors";

interface InputProps {
  label?: string;
  variant: "text" | "password" | "textarea";
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  value?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  onChangeText?: (text: string) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  errors?: string;
  prefix?: string;
  suffix?: string;
  maxLength?: number;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      variant,
      placeholder,
      style,
      value,
      onSubmitEditing,
      returnKeyType,
      onChangeText,
      onBlur,
      editable,
      keyboardType,
      errors,
      prefix,
      suffix,
      maxLength,
    },
    ref
  ) => {
    if (variant === "text") {
      return (
        <View style={style}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Column
            gap={Platform.OS === "ios" ? 12 : 8}
            style={[label && { marginTop: 8 }]}
          >
            <Row
              gap={8}
              style={[
                styles.container,
                glob.horizontalCenter,
                editable === false && styles.disabled,
              ]}
            >
              {prefix && <Text style={styles.prefix}>{prefix}</Text>}
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                ref={ref}
                value={value}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                onChangeText={onChangeText}
                onBlur={onBlur}
                editable={editable}
                keyboardType={keyboardType}
                maxLength={maxLength}
              />
              {suffix && <Text style={styles.suffix}>{suffix}</Text>}
            </Row>
            {errors && <FormErrorMessage errors={errors} />}
          </Column>
        </View>
      );
    }

    const [passwordVisible, setPasswordVisible] = useState(true);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
    if (variant === "password") {
      return (
        <View style={style}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Column
            gap={Platform.OS === "ios" ? 12 : 8}
            style={[label && { marginTop: 8 }]}
          >
            <Row style={[styles.container, glob.horizontalCenter]}>
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={passwordVisible}
                ref={ref}
                value={value}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                onChangeText={onChangeText}
                onBlur={onBlur}
                editable={editable}
                maxLength={maxLength}
              />

              <TouchableOpacity
                activeOpacity={1}
                onPress={togglePasswordVisibility}
              >
                <MaterialIcons
                  name={passwordVisible ? "visibility-off" : "visibility"}
                  size={Platform.OS === "ios" ? 24 : 20}
                  style={{ color: "#A6A6A6" }}
                />
              </TouchableOpacity>
            </Row>
            {errors && <FormErrorMessage errors={errors} />}
          </Column>
        </View>
      );
    }

    if (variant === "textarea") {
      const [charCount, setCharCount] = useState(value?.length || 0);
      return (
        <View style={style}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Column gap={8}>
            <TextInput
              style={[styles.textarea, label && { marginTop: 8 }]}
              placeholder={placeholder}
              ref={ref}
              value={value}
              onSubmitEditing={onSubmitEditing}
              returnKeyType={returnKeyType}
              onChangeText={(text) => {
                setCharCount(text.length);
                if (onChangeText) onChangeText(text);
              }}
              onBlur={onBlur}
              editable={editable}
              multiline={true}
              maxLength={maxLength}
            />
            <Row
              style={[
                glob.spaceBetween,
                glob.horizontalCenter,
                !errors && { justifyContent: "flex-end" },
              ]}
            >
              {errors && <FormErrorMessage errors={errors} />}
              <Text
                style={styles.charCount}
              >{`${charCount}/${maxLength}`}</Text>
            </Row>
          </Column>
        </View>
      );
    }
  }
);

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  container: {
    borderWidth: 1,
    borderColor: "#A6A6A6",
    borderRadius: 4,
    backgroundColor: theme.color.white,
    height: 48,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
  textarea: {
    height: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: "#A6A6A6",
    borderRadius: 4,
    backgroundColor: theme.color.white,
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: Platform.OS === "ios" ? getFontSize(12) : getFontSize(14),
    color: "#A6A6A6",
  },
  prefix: {
    fontSize: getFontSize(16),
  },
  suffix: {
    fontSize: getFontSize(16),
  },
  disabled: {
    borderWidth: 0,
    backgroundColor: "#F2F2F2",
  },
});
