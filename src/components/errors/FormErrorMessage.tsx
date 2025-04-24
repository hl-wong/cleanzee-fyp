import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Row from "../Row";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";

interface FormErrorMessageProps {
  errors: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ errors }) => {
  return (
    <Row gap={8} style={glob.horizontalCenter}>
      <MaterialIcons name="error" size={16} color={theme.color.error} />
      <Text style={styles.errors}>{errors}</Text>
    </Row>
  );
};

export default FormErrorMessage;

const styles = StyleSheet.create({
  errors: {
    fontSize: getFontSize(12),
    color: theme.color.error,
  },
});
