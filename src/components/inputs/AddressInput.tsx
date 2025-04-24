import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Row from "../Row";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { glob, theme } from "../../assets/styles";
import { getFontSize } from "../../utils";
import Column from "../Column";
import { FormErrorMessage } from "../errors";

interface AddressInputProps {
  value?: string;
  onPress?: () => void;
  errors?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onPress,
  errors,
}) => {
  return (
    <View>
      <Text style={styles.label}>Address</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Column gap={8}>
          <Row
            gap={8}
            style={[styles.container, glob.horizontalCenter, { marginTop: 8 }]}
          >
            <TextInput
              style={styles.input}
              placeholder="Select address"
              value={value}
              editable={false}
            />
            <MaterialIcons name="chevron-right" size={24} />
          </Row>
          {errors && <FormErrorMessage errors={errors} />}
        </Column>
      </TouchableOpacity>
    </View>
  );
};

export default AddressInput;

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
});
