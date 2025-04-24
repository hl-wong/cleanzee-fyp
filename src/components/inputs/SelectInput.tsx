import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { getFontSize } from "../../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";
import { glob } from "../../assets/styles";
import Column from "../Column";
import { FormErrorMessage } from "../errors";

interface SelectInputProps {
  label?: string;
  items: { label: string; value: string }[];
  onValueChange: (value: string | null, index: number) => void;
  value?: string | null;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  errors?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  items,
  onValueChange,
  value,
  placeholder,
  style,
  errors,
}) => {
  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Column gap={8}>
        <RNPickerSelect
          items={items.map((item, index) => ({
            ...item,
            key: index.toString(),
          }))}
          onValueChange={onValueChange}
          value={value}
          placeholder={{ label: placeholder, value: "" }}
          style={{
            inputAndroidContainer: [
              styles.containerAndroid,
              glob.verticalCenter,
              label && { marginTop: 8 },
            ],
            inputAndroid: styles.inputAndroid,
            inputIOSContainer: [
              styles.containeriOS,
              glob.verticalCenter,
              label && { marginTop: 8 },
            ],
            inputIOS: styles.inputiOS,
            iconContainer: styles.iconContainer,
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => <MaterialIcons name="keyboard-arrow-down" size={24} />}
        />

        {errors && <FormErrorMessage errors={errors} />}
      </Column>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  label: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
    fontWeight: 600,
  },
  containerAndroid: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#A6A6A6",
    borderRadius: 4,
    height: 48,
  },
  inputAndroid: {
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
  containeriOS: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#A6A6A6",
    borderRadius: 4,
    height: 48,
  },
  inputiOS: {
    flex: 1,
    fontSize: Platform.OS === "ios" ? getFontSize(14) : getFontSize(16),
  },
  iconContainer: {
    right: 10,
  },
});
