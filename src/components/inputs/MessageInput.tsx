import { StyleSheet, TextInput } from "react-native";
import React from "react";

interface MessageInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSend?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  value,
  onChangeText,
  onSend,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSend}
      returnKeyType="send"
    />
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    height: 48,
    borderRadius: 28,
    flexShrink: 1,
    width: "100%",
  },
});
