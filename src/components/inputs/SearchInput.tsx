import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Row from "../Row";
import { getFontSize } from "../../utils";
import { glob, theme } from "../../assets/styles";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable,
}) => {
  return (
    <Row gap={8} style={[styles.container, glob.horizontalCenter]}>
      <MaterialIcons name="search" size={24} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </Row>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
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
});
